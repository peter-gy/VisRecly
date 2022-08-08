/**
 * Omits the first element's type of the passed array.
 */
export type OmitFirst<T extends any[]> = T extends [any, ...infer R]
  ? R
  : never;
