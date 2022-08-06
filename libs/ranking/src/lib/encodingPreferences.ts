/**
 * Represents preferences to encode given data columns onto channels
 * available on this `type`.
 *
 * To obtain sensible vega-lite specs, the values of the preferences
 * **must** be valid data column names.
 */
export type EncodingPreference = {
  /**
   * Name of the data column to be encoded on the `x` axis.
   */
  x: string;

  /**
   * Name of the data column to be encoded on the `y` axis.
   */
  y: string;
};

/**
 * Constructs an ASP section made up of rules, enforcing to use the specified
 * `columnName` for the specified `channel`.
 *
 * E.g. for `channel=='x'` and `columnName=='Acceleration'`,
 * the function would return:
 *
 * ```
 * encoding(x).
 * :- not field(x,"Acceleration").
 * ```
 *
 * - `encoding(x).` declares that `x` is an encoding.
 * - `:- not field(x,"Acceleration").` declares that it cannot be the case
 * that "Acceleration" is not a field encoded on `x`.
 *
 * @param channel - encoding channel
 * @param columnName - data column name
 */
function preferenceToAsp(channel: string, columnName: string): string {
  const atom = `encoding(${channel}).`;
  const rule = `:- not field(${channel},"${columnName}").`;
  return [atom, rule].join('\n');
}

/**
 * Constructs an ASP program section declaring
 * the encoding preferences per channel.
 *
 * @param encodingPrefs - the desired encodings
 */
export function encodingPrefsToAsp(encodingPrefs: EncodingPreference): string {
  const encodingPrefsAsps = Object.entries(encodingPrefs).map(
    ([channel, columnName]) => preferenceToAsp(channel, columnName),
  );
  return encodingPrefsAsps.join('\n\n');
}
