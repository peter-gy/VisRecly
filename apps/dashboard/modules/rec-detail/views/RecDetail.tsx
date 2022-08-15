import { ReactElement, Ref, forwardRef } from 'react';
import { VegaLite } from 'react-vega';

import { RankedVisualizationExplicit } from '@visrecly/ranking';

import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Dialog, IconButton, Slide, Toolbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import useMuiAppBarHeight from '@dashboard/hooks/useMuiAppBarHeight';
import useWindowSize from '@dashboard/hooks/useWindowSize';
import {
  normalizeCost,
  scaleRange,
} from '@dashboard/modules/heatmap/beans/scale';
import { topPerformingTasksOfVis } from '@dashboard/modules/rec-detail/utils/utils';

type RecDetailProps = {
  open: boolean;
  onClose: () => void;
  rankedVisualization: RankedVisualizationExplicit;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RecDetail({ open, onClose, rankedVisualization }: RecDetailProps) {
  const { width, height } = useWindowSize();
  const appBarHeight = useMuiAppBarHeight();
  const factor = 0.5;
  const layoutNormalization = {
    height: 'calc(100vh - ' + 2 * appBarHeight + 'px)',
    maxHeight: 'calc(100vh - ' + 2 * appBarHeight + 'px)',
    maxWidth: '75vw',
    marginTop: 1.5 * appBarHeight,
    marginBottom: 0.5 * appBarHeight,
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <h3>Recommendation Details</h3>
        </Toolbar>
      </AppBar>
      <div className="mx-4 bg-primary-50 flex flex-row justify-around items-center">
        <div style={layoutNormalization}>
          <RecDetailText rankedVisualization={rankedVisualization} />
        </div>
        <div
          className="p-4 border-2 border-primary-800 rounded-md bg-white overflow-auto"
          style={layoutNormalization}
        >
          <VegaLite
            spec={rankedVisualization.vegaLiteSpec}
            width={factor * width}
            height={factor * height}
          />
        </div>
      </div>
    </Dialog>
  );
}

type RecDetailTextProps = {
  rankedVisualization: RankedVisualizationExplicit;
};

function RecDetailText({ rankedVisualization }: RecDetailTextProps) {
  const items: RecDetailTextItemProps[] = [
    {
      title: '🥇 Overall Rank',
      content: `Rank ${rankedVisualization.overallRank}`,
    },
    {
      title: '🎯 Most Suitable Tasks',
      content: topPerformingTasksOfVis(rankedVisualization).join(', '),
    },
    {
      title: '📈 Data-oriented Score',
      content: `${normalizeCost(rankedVisualization.dataOrientedCost).toFixed(
        2,
      )} / ${scaleRange[1]}`,
    },
  ];
  const visRank = rankedVisualization.overallRank;
  return (
    <div className="flex flex-col space-y-4">
      {items.map((textItemProp, idx) => (
        <div key={`rec-detail-text-${visRank}-${idx}`}>
          <RecDetailTextItem {...textItemProp} />
        </div>
      ))}
    </div>
  );
}

type RecDetailTextItemProps = {
  title: string;
  content: string;
};

function RecDetailTextItem({ title, content }: RecDetailTextItemProps) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="font-bold">{title}</span>
      <span className="italic">{content}</span>
    </div>
  );
}

export default RecDetail;
