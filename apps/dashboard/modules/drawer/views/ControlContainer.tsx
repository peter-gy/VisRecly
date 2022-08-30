import { ReactNode } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import {
  Divider,
  IconButton,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';

type ControlContainerProps = {
  title: string;
  description: string;
  ControlComponent: ReactNode;
};

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }}>
    {props.children}
  </Tooltip>
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '40vw',
  },
});

function ControlContainer({
  title,
  description,
  ControlComponent,
}: ControlContainerProps) {
  return (
    <>
      <div className="flex justify-start items-center mb-2">
        <Divider textAlign="left">
          <h2>{title}</h2>
        </Divider>
        <CustomWidthTooltip title={description} placement="right">
          <IconButton aria-label="Information">
            <InfoIcon className="text-primary" />
          </IconButton>
        </CustomWidthTooltip>
      </div>
      <div>{ControlComponent}</div>
    </>
  );
}

export default ControlContainer;
