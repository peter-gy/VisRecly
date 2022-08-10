/**
 * Transforms a `snake_case` string to a `human case` string.

 * @param snakeCase - The snake case string to transform.
 */
export function snakeCaseToHumanCase(snakeCase: string): string {
  return snakeCase.replace(/_/g, ' ');
}
