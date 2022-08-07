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
 * Same as the unfolded values of the Vega-Lite v5 spec's `Mark` section.
 *
 * @see https://vega.github.io/schema/vega-lite/v5.json
 */
type VegaLiteMark =
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

/**
 * Composite marks supported by Vega-Lite v5.
 *
 * Same as the unfolded values of the Vega-Lite v5 spec's `CompositeMark` section.
 *
 * @see https://vega.github.io/schema/vega-lite/v5.json
 */
type VegaLiteCompositeMark = 'boxplot' | 'errorbar' | 'errorband';

/**
 * Marks supported by Vega-Lite v5.
 *
 * Same as the unfolded values of the Vega-Lite v5 spec's `AnyMark` section.
 *
 * @see https://vega.github.io/schema/vega-lite/v5.json
 */
export type VegaLiteAnyMark = VegaLiteMark | VegaLiteCompositeMark;

export type MarkPreference = {
  /**
   * The mark about which the preference is being stated.
   */
  mark: VegaLiteAnyMark;

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

/**
 * Record of `VisTaskWithPreferences`s indexed by name.
 */
export type VisTaskMap = Record<VisTask['name'], VisTaskWithPreferences>;

/**
 * Record of `VisTask` costs indexed by `VisTask` name.
 */
export type VisTaskCostMap = Record<VisTask['name'], number>;
