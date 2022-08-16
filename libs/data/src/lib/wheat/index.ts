import { DataSet } from '../types';
import data from './wheat.json';

export const WHEAT: DataSet = {
  name: 'Wheat',
  description:
    'In an 1822 letter to Parliament, William Playfair, ' +
    'a Scottish engineer who is often credited as the founder of statistical graphics, ' +
    'published an elegant chart on the price of wheat. This dataset was the underlying source of the visualization.',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/wheat.json',
  data,
};
