import { DataSet } from '../types';
import data from './penguins.json';

export const PENGUINS: DataSet = {
  name: 'Penguins',
  description: 'Dataset of penguins',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/penguins.json',
  data,
};
