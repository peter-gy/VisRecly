import { DataSet } from '../types';
import data from './movies.json';

export const MOVIES: DataSet = {
  name: 'Movies',
  description:
    'Dataset of movies. ' +
    'The dataset has well known and intentionally included errors.',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/movies.json',
  data,
};
