import { VisTask } from '@visrecly/vis-tasks';

export type ColumnType = VisTask['name'];

export type BinType = {
  idx: number;
  cost: number;
  normalizedCost: number;
};

export type HeatmapState = {
  bins: BinType[];
  highlightedBins: BinType[];
  fadedBins: BinType[];
};
