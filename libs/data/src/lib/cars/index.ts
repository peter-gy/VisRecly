import { DataSet } from '../types';
import carsJson from './cars.json';

export const CARS: DataSet = {
  name: 'Cars',
  description: 'Dataset of cars',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/cars.json',
  data: carsJson,
};
