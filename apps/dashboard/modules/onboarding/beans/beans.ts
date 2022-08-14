import { Step } from 'intro.js-react';

import Heatmap from '@dashboard/modules/heatmap/views/Heatmap';
import HeatmapScale from '@dashboard/modules/heatmap/views/HeatmapScale';
import RecList from '@dashboard/modules/rec-list/views/RecList';

export const steps: Step[] = [
  {
    element: `#app-title`,
    intro: 'This is a nice app',
    position: 'bottom',
  },
  {
    element: `#${RecList.name}`,
    intro: 'This is the recommended list',
  },
  {
    element: `#${HeatmapScale.name}`,
    intro: 'This is the heatmap scale',
  },
  {
    element: `#${Heatmap.name}`,
    intro: 'This is the heatmap',
  },
];

export const initialStep = 0;
