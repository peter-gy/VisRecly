import { DataSet } from '../types';
import data from './weather.json';

export const WEATHER: DataSet = {
  name: 'Weather',
  description: 'Dataset of weather',
  source:
    'https://raw.githubusercontent.com/vega/vega-datasets/next/data/weather.json',
  data,
};
