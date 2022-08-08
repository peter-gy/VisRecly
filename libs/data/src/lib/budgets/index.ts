import { DataSet } from '../types';
import data from './budgets.json';

export const BUDGETS: DataSet = {
  name: 'Budgets',
  description: 'Dataset of budgets',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/budgets.json',
  data,
};
