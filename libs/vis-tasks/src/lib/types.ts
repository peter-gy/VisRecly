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
  weight: number;
};

/**
 * Associates a ``VisTask`` with an array of ``MarkPreference``s.
 *
 * Facilitates expressing which marks are preferred (and to what extent)
 * for a given visualization task.
 * (E.g. for the "Comparison" task, we prefer "line", "point" or "bar")
 */
export type VisTaskWithPreferences = VisTask & {
  preferences: MarkPreference[];
};
