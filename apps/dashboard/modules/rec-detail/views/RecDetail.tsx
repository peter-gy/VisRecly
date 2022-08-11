import { ReactElement, Ref, forwardRef } from 'react';
import { VegaLite } from 'react-vega';

import { RankedVisualization } from '@visrecly/ranking';

import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Dialog, IconButton, Slide, Toolbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import useMuiAppBarHeight from '@dashboard/hooks/useMuiAppBarHeight';
import useWindowSize from '@dashboard/hooks/useWindowSize';

type RecDetailProps = {
  open: boolean;
  onClose: () => void;
  rankedVisualization: RankedVisualization;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RecDetail({
  open,
  onClose,
  rankedVisualization: { vegaLiteSpec },
}: RecDetailProps) {
  const { width, height } = useWindowSize();
  const appBarHeight = useMuiAppBarHeight();
  const factor = 0.5;
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
        </Toolbar>
      </AppBar>
      <div
        className="flex justify-center items-center overflow-auto bg-primary-50"
        style={{
          height: 'calc(100vh - ' + appBarHeight + 'px)',
          marginTop: appBarHeight,
        }}
      >
        <div className="p-4 border-2 border-primary-800 rounded-md bg-white">
          <VegaLite
            spec={vegaLiteSpec}
            width={factor * width}
            height={factor * height}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default RecDetail;
