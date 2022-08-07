/**
 * Constructs an ASP section made up of rules, declaring that the given
 * `columnName` should be encoded visually.
 *
 * E.g. for `encoding=='e0'` and `columnName=='Acceleration'`,
 * the function would return:
 *
 * ```
 * encoding(e0).
 * :- not field(e0,"Acceleration").
 * ```
 *
 * - `encoding(e0).` declares that `e0` is an encoding.
 * - `:- not field(e0,"Acceleration").` declares that it cannot be the case
 * that "Acceleration" is not a field encoded on `e0`.
 *
 * @param encoding - encoding
 * @param columnName - data column name
 */
function preferenceToAsp(encoding: string, columnName: string): string {
  const atom = `encoding(${encoding}).`;
  const rule = `:- not field(${encoding},"${columnName}").`;
  return [atom, rule].join('\n');
}

/**
 * Constructs an ASP program section declaring
 * the encoding preferences per channel.
 *
 * @param encodingPrefs - a list of data column names to be encoded
 */
export function encodingPrefsToAsp(encodingPrefs: string[]): string {
  const encodingPrefsAsps = Object.entries(encodingPrefs).map(
    ([idx, columnName]) => preferenceToAsp(`e${idx}`, columnName),
  );
  return encodingPrefsAsps.join('\n\n');
}
