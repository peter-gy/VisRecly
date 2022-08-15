/**
 * Omits the first element's type of the passed array.
 */
export type OmitFirst<T extends unknown[]> = T extends [unknown, ...infer R]
  ? R
  : never;
