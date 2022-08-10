import { DataSet } from '../types';
import data from './income.json';

export const INCOME: DataSet = {
  name: 'Income',
  description: 'Dataset of income',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/income.json',
  data,
};
