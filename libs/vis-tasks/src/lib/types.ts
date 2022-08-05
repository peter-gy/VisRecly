export type DescriptionContentType = 'text' | 'md';

export type Description = {
  contentType: DescriptionContentType;
  content: string;
};

/**
 * Represents a visualization task.
 */
export type VisTask = {
  name: string;
  descriptionShort: string;
  descriptionLong: Description;
};

/**
 * Primitive marks supported by Vega-Lite v5.
 *
 * @see https://vega.github.io/schema/vega-lite/v5.json
 */
export type VegaLiteMark =
  | 'arc'
  | 'area'
  | 'bar'
  | 'image'
  | 'line'
  | 'point'
  | 'rect'
  | 'rule'
  | 'text'
  | 'tick'
  | 'trail'
  | 'circle'
  | 'square'
  | 'geoshape';

export type MarkPreference = {
  mark: VegaLiteMark;

  /**
   * Weight denoting the importance of this preference.
   */
  weight: number;
};

/**
 * Facilitates expressing which marks are preferred (and to what extent)
 * for a given visualization task.
 * (E.g. for the "Comparison" task, we prefer "line", "point" or "bar")
 */
export type VisTaskPreferences = {
  /**
   * Explicitly declared marks which are **optimal** (favored) for this task.
   */
  favors: MarkPreference[];

  /**
   * Explicitly declared marks which are **sub-optimal** (disfavored) for this task.
   */
  disfavors: MarkPreference[];
};

/**
 * Associates a ``VisTask`` with its ``VisTaskPreferences``s.
 */
export type VisTaskWithPreferences = VisTask & VisTaskPreferences;
