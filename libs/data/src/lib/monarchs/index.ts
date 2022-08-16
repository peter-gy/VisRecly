import { DataSet } from '../types';
import data from './monarchs.json';

export const MONARCHS: DataSet = {
  name: 'Monarchs',
  description: 'Dataset of monarchs',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/monarchs.json',
  data,
};
