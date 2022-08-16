import { DataSet } from '../types';
import data from './cars.json';

export const CARS: DataSet = {
  name: 'Cars',
  description:
    'This was the 1983 ASA Data Exposition dataset. ' +
    'The dataset was collected by Ernesto Ramos and David Donoho and dealt with automobiles.',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/cars.json',
  data,
};
