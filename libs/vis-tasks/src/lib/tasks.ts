import {
  VisTask,
  VisTaskMap,
  VisTaskPreferences,
  VisTaskWithPreferences,
} from './types';
import { createMarkPreference, mergeVisTaskWithPreferences } from './utils';

const CHANGE_OVER_TIME_TASK: VisTask = {
  name: 'Change over time',
  descriptionShort: 'Analyse how the data changes over time series',
  descriptionLong: {
    contentType: 'text',
    content: 'Analyse how the data changes over time series',
  },
};
const CHANGE_OVER_TIME_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('line'), createMarkPreference('area')],
  disfavors: [],
};
export const CHANGE_OVER_TIME = mergeVisTaskWithPreferences(
  CHANGE_OVER_TIME_TASK,
  CHANGE_OVER_TIME_PREFS,
);

const CHARACTERIZE_DISTRIBUTION_TASK: VisTask = {
  name: 'Characterize distribution',
  descriptionShort: 'Characterize the distribution of the data over the set',
  descriptionLong: {
    contentType: 'text',
    content: 'Characterize the distribution of the data over the set',
  },
};
const CHARACTERIZE_DISTRIBUTION_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('bar'), createMarkPreference('point')],
  disfavors: [],
};
export const CHARACTERIZE_DISTRIBUTION = mergeVisTaskWithPreferences(
  CHARACTERIZE_DISTRIBUTION_TASK,
  CHARACTERIZE_DISTRIBUTION_PREFS,
);

const CLUSTER_TASK: VisTask = {
  name: 'Cluster',
  descriptionShort: 'Find clusters of similar attribute values',
  descriptionLong: {
    contentType: 'text',
    content: 'Find clusters of similar attribute values',
  },
};
const CLUSTER_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('bar'), createMarkPreference('point')],
  disfavors: [],
};
export const CLUSTER = mergeVisTaskWithPreferences(CLUSTER_TASK, CLUSTER_PREFS);

const COMPARISON_TASK: VisTask = {
  name: 'Comparison',
  descriptionShort: 'Give emphasis to comparison on different entities',
  descriptionLong: {
    contentType: 'text',
    content: 'Give emphasis to comparison on different entities',
  },
};
const COMPARISON_PREFS: VisTaskPreferences = {
  favors: [
    createMarkPreference('line'),
    createMarkPreference('point'),
    createMarkPreference('bar'),
  ],
  disfavors: [],
};
export const COMPARISON = mergeVisTaskWithPreferences(
  COMPARISON_TASK,
  COMPARISON_PREFS,
);

const COMPUTE_DERIVED_VALUE_TASK: VisTask = {
  name: 'Compute derived value',
  descriptionShort: 'Compute aggregated or binned numeric derived value',
  descriptionLong: {
    contentType: 'text',
    content: 'Compute aggregated or binned numeric derived value',
  },
};
const COMPUTE_DERIVED_VALUE_PREFS: VisTaskPreferences = {
  favors: [
    createMarkPreference('line'),
    createMarkPreference('point'),
    createMarkPreference('bar'),
  ],
  disfavors: [],
};
export const COMPUTE_DERIVED_VALUE = mergeVisTaskWithPreferences(
  COMPUTE_DERIVED_VALUE_TASK,
  COMPUTE_DERIVED_VALUE_PREFS,
);

const CORRELATE_TASK: VisTask = {
  name: 'Correlate',
  descriptionShort: 'Determine useful relationships between the columns',
  descriptionLong: {
    contentType: 'text',
    content: 'Determine useful relationships between the columns',
  },
};
const CORRELATE_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('bar'), createMarkPreference('line')],
  disfavors: [],
};
export const CORRELATE = mergeVisTaskWithPreferences(
  CORRELATE_TASK,
  CORRELATE_PREFS,
);

const DETERMINE_RANGE_TASK: VisTask = {
  name: 'Determine range',
  descriptionShort: 'Find the span of values within the set',
  descriptionLong: {
    contentType: 'text',
    content: 'Find the span of values within the set',
  },
};
const DETERMINE_RANGE_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('tick')],
  disfavors: [],
};
export const DETERMINE_RANGE = mergeVisTaskWithPreferences(
  DETERMINE_RANGE_TASK,
  DETERMINE_RANGE_PREFS,
);

const DEVIATION_TASK: VisTask = {
  name: 'Deviation',
  descriptionShort: 'Compare data with certain value like zero or mean',
  descriptionLong: {
    contentType: 'text',
    content: 'Compare data with certain value like zero or mean',
  },
};
const DEVIATION_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('bar'), createMarkPreference('rule')],
  disfavors: [],
};
export const DEVIATION = mergeVisTaskWithPreferences(
  DEVIATION_TASK,
  DEVIATION_PREFS,
);

const FILTER_TASK: VisTask = {
  name: 'Filter',
  descriptionShort: 'Find data cases satisfying the given constraints',
  descriptionLong: {
    contentType: 'text',
    content: 'Find data cases satisfying the given constraints',
  },
};
const FILTER_PREFS: VisTaskPreferences = {
  favors: [
    createMarkPreference('rect'),
    createMarkPreference('bar'),
    createMarkPreference('arc'),
  ],
  disfavors: [],
};
export const FILTER = mergeVisTaskWithPreferences(FILTER_TASK, FILTER_PREFS);

const FIND_ANOMALIES_TASK: VisTask = {
  name: 'Find anomalies',
  descriptionShort: 'Identify any anomalies within the dataset',
  descriptionLong: {
    contentType: 'text',
    content: 'Identify any anomalies within the dataset',
  },
};
const FIND_ANOMALIES_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('bar'), createMarkPreference('point')],
  disfavors: [],
};
export const FIND_ANOMALIES = mergeVisTaskWithPreferences(
  FIND_ANOMALIES_TASK,
  FIND_ANOMALIES_PREFS,
);

const FIND_EXTREMUM_TASK: VisTask = {
  name: 'Find extremum',
  descriptionShort: 'Find extreme values of data column',
  descriptionLong: {
    contentType: 'text',
    content: 'Find extreme values of data column',
  },
};
const FIND_EXTREMUM_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('bar'), createMarkPreference('point')],
  disfavors: [],
};
export const FIND_EXTREMUM = mergeVisTaskWithPreferences(
  FIND_EXTREMUM_TASK,
  FIND_EXTREMUM_PREFS,
);

const MAGNITUDE_TASK: VisTask = {
  name: 'Magnitude',
  descriptionShort: 'Show relative or absolute size comparisons',
  descriptionLong: {
    contentType: 'text',
    content: 'Show relative or absolute size comparisons',
  },
};
const MAGNITUDE_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('arc'), createMarkPreference('bar')],
  disfavors: [],
};
export const MAGNITUDE = mergeVisTaskWithPreferences(
  MAGNITUDE_TASK,
  MAGNITUDE_PREFS,
);

const PART_TO_WHOLE_TASK: VisTask = {
  name: 'Part to whole',
  descriptionShort: 'Show component elements of a single entity',
  descriptionLong: {
    contentType: 'text',
    content: 'Show component elements of a single entity',
  },
};
const PART_TO_WHOLE_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('arc')],
  disfavors: [],
};
export const PART_TO_WHOLE = mergeVisTaskWithPreferences(
  PART_TO_WHOLE_TASK,
  PART_TO_WHOLE_PREFS,
);

const RETRIEVE_VALUE_TASK: VisTask = {
  name: 'Retrieve value',
  descriptionShort: 'Find values of specific columns',
  descriptionLong: {
    contentType: 'text',
    content: 'Find values of specific columns',
  },
};
const RETRIEVE_VALUE_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('rect')],
  disfavors: [],
};
export const RETRIEVE_VALUE = mergeVisTaskWithPreferences(
  RETRIEVE_VALUE_TASK,
  RETRIEVE_VALUE_PREFS,
);

const SORT_TASK: VisTask = {
  name: 'Sort',
  descriptionShort: 'Rank data according to some ordinal metric',
  descriptionLong: {
    contentType: 'text',
    content: 'Rank data according to some ordinal metric',
  },
};
const SORT_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('bar')],
  disfavors: [],
};
export const SORT = mergeVisTaskWithPreferences(SORT_TASK, SORT_PREFS);

const TREND_TASK: VisTask = {
  name: 'Trend',
  descriptionShort: 'Use regression or loess to show the variation trend',
  descriptionLong: {
    contentType: 'text',
    content: 'Use regression or loess to show the variation trend',
  },
};
const TREND_PREFS: VisTaskPreferences = {
  favors: [createMarkPreference('point'), createMarkPreference('line')],
  disfavors: [],
};
export const TREND = mergeVisTaskWithPreferences(TREND_TASK, TREND_PREFS);

/**
 * A collection of all declared `VisTaskWithPreferences` instances, ordered
 * alphabetically by name.
 */
export const TASKS = [
  CHANGE_OVER_TIME,
  CHARACTERIZE_DISTRIBUTION,
  CLUSTER,
  COMPARISON,
  COMPUTE_DERIVED_VALUE,
  CORRELATE,
  DETERMINE_RANGE,
  DEVIATION,
  FILTER,
  FIND_ANOMALIES,
  FIND_EXTREMUM,
  MAGNITUDE,
  PART_TO_WHOLE,
  RETRIEVE_VALUE,
  SORT,
  TREND,
];

/**
 * A collection of all declared `VisTaskWithPreferences` instances,
 * indexed by name.
 */
export const TASK_MAP: VisTaskMap = TASKS.reduce(
  (acc, curr) => ({ ...acc, [curr.name]: curr }),
  {},
);

/**
 * Helper function to access a `VisTaskWithPreferences` instance by name.
 *
 * Returns the value from the default `TASK_MAP`.
 *
 * @param name - the name of the task to retrieve
 */
export function taskByName(name: VisTask['name']): VisTaskWithPreferences {
  return TASK_MAP[name];
}
