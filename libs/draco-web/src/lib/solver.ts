import { run as clingoRun, ClingoError, ClingoResult } from 'clingo-wasm';
import {
  constraints,
  Constraint,
  data2schema,
  Schema,
  constraints2json,
  schema2asp,
  json2constraints,
} from '@visrecly/draco-core';
import { DracoOptions, SolutionSet } from './types';
import { extractModels, models2vl } from './clingoResultExtractor';

const defaultHardConstraints = constraints2json(constraints.HARD);
const defaultSoftConstraints = constraints2json(
  constraints.SOFT,
  constraints.WEIGHTS
);

const defaultClingoOptions = [
  '--opt-mode=OptN', // find multiple optimal models
  '--quiet=1', // only output optimal models
  '--project', // every model only once
];

/**
 * ASP-based visualization recommender.
 *
 * "ASP as a method is oriented towards combinatorial search problems,
 * where the goal is to find a solution among a large,
 * but finite, number of possibilities."
 *
 * @see https://github.com/uwdata/draco
 * @see https://www.cs.utexas.edu/~vl/teaching/378/pwc.pdf
 */
export class Draco {
  /**
   * Schema of the `data`, including its size and statistics.
   * @private
   */
  private readonly schema: Schema;

  /**
   * Data declaration as a single ASP string, interpretable by Clingo.
   *
   * Atoms it holds are:
   * - `num_rows`: the number of rows in the data, same as `data.length`.
   * - `fieldtype`: the type of field of each column, e.g. `number` or `string`.
   * - `cardinality`: the cardinality of each field
   * @private
   */
  private readonly schemaAsp: string;

  /**
   * Constraints to be used by the solver.
   * @private
   */
  private readonly constraints: typeof constraints = constraints;

  /**
   * Hard constraints to consider when solving for models.
   * @private
   */
  private readonly hardConstraints: Constraint[] = defaultHardConstraints;

  /**
   * Soft constraints to consider when solving for models.
   * @private
   */
  private readonly softConstraints: Constraint[] = defaultSoftConstraints;

  /**
   * Initializes this object with the given data.
   * The supplied `data` is not stored as a member, it is just used to generate
   * its schema.
   *
   * @param data - the data to generate recommendations for
   */
  constructor(data: any[]) {
    this.schema = data2schema(data);
    this.schemaAsp = schema2asp(this.schema).join('\n');
  }

  public async solve(
    program: string = '',
    options: DracoOptions = {}
  ): Promise<ClingoError | SolutionSet> {
    // The full ASP to be passed to Clingo
    const fullProgram = this.constructFullProgram(program, options);

    // Arguments passed to Clingo
    const clingoOptions = this.constructClingoOptions(options);

    // Web-assembly call to solve the ASP program
    const clingoResultOrError = await clingoRun(
      fullProgram,
      options.models,
      clingoOptions
    );
    const isError = 'Error' in clingoResultOrError;
    if (isError) {
      return Promise.reject(clingoResultOrError);
    }
    const result = clingoResultOrError as ClingoResult;
    const constraints = [...this.softConstraints, ...this.hardConstraints];
    const models = extractModels(result, constraints);
    const vegaLiteSpecs = models2vl(models);
    return { models, vegaLiteSpecs, result };
  }

  private constructFullProgram(program: string, options: DracoOptions) {
    // Constructing the full ASP, starting with the user's program
    const programChunks = [program];
    // Add the schema declaration
    programChunks.push(this.schemaAsp);

    const excludedProgramNames = ['SOFT', 'HARD', 'WEIGHTS'];
    const programNames = Object.keys(this.constraints).filter(
      (name) => !excludedProgramNames.includes(name)
    );
    // Remove HARD_INTEGRITY constraints if relaxed option is set
    if (options.relaxHard) {
      programNames.splice(programNames.indexOf('HARD_INTEGRITY'), 1);
    }
    // Add the constraints
    programChunks.push(
      ...programNames.map((name) => (this.constraints as any)[name])
    );

    const softAsp = json2constraints(this.softConstraints);
    programChunks.push(softAsp.definitions, softAsp.weights!, softAsp.assigns!);
    const hardAsp = json2constraints(this.hardConstraints);
    programChunks.push(hardAsp.definitions);

    return programChunks.join('\n\n\n');
  }

  private constructClingoOptions(options: DracoOptions) {
    return (options.clingoOptions || defaultClingoOptions).concat(
      (options.weights || []).map((w) => `-c ${w.name}=${w.value}`)
    );
  }
}
