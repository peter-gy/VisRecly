import { DataSet } from '../types';
import data from './movies.json';

export const MOVIES: DataSet = {
  name: 'Movies',
  description: 'Dataset of movies',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/movies.json',
  data,
};
