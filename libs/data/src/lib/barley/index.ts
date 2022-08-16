import { DataSet } from '../types';
import data from './barley.json';

export const BARLEY: DataSet = {
  name: 'Barley',
  description:
    'The result of a 1930s agricultural experiment in Minnesota, ' +
    'this dataset contains yields for 10 different varieties of barley at six different sites.',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/barley.json',
  data,
};
