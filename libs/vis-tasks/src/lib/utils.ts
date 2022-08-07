import {
  MarkPreference,
  VegaLiteAnyMark,
  VisTask,
  VisTaskPreferences,
  VisTaskWithPreferences,
} from './types';

/**
 * Constructs a `MarkPreference` with a default weight of `1`,
 * if `weight` is not specified.
 *
 * @param mark - visual mark
 * @param weight - optional weight
 */
export function createMarkPreference(
  mark: VegaLiteAnyMark,
  weight?: number,
): MarkPreference {
  return { mark: mark, weight: weight ?? 1 };
}

/**
 * Helper to construct a single object holding the props
 * of a `VisTask` and a `VisTaskPreferences` instance.
 * @param task - the visualization task
 * @param prefs - the mark preferences of the supplied `task`
 */
export function mergeVisTaskWithPreferences(
  task: VisTask,
  prefs: VisTaskPreferences,
): VisTaskWithPreferences {
  return { ...task, ...prefs };
}
