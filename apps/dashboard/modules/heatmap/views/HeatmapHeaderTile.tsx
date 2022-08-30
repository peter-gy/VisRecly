import { useState } from 'react';

import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { Information } from '@dashboard/modules/components/info-dialog-button/information.type';
import InfoDialogButton from '@dashboard/modules/components/info-dialog-button/views/InfoDialogButton';

export type HeatmapHeaderTileProps = {
  title: string;
  info: Information;
  onVisibilityChange?: (visible: boolean) => void;
  width?: number;
  height?: number;
};

function HeatmapHeaderTile({
  title,
  info,
  onVisibilityChange,
  width,
  height,
}: HeatmapHeaderTileProps) {
  const [visible, setVisible] = useState<boolean>(true);
  const VisibilityIcon = visible ? VisibilityOffIcon : VisibilityOnIcon;
  const handleVisibilityIconClick = () => {
    onVisibilityChange(!visible);
    setVisible(!visible);
  };

  return (
    <div
      className="flex flex-col justify-start items-center space-y-1 bg-primary-300 border-r-[1px] border-primary-800"
      style={{
        width: width,
        maxWidth: width,
        height: height,
        maxHeight: height,
      }}
    >
      <div className="flex justify-between items-center">
        <InfoDialogButton {...info} />
        <Tooltip
          title={visible ? 'Blend out this task' : 'Highlight this task'}
        >
          <IconButton
            onClick={handleVisibilityIconClick}
            aria-label="Toggle visibility"
          >
            <VisibilityIcon className="text-primary-900" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="text-xs text-center">{title}</div>
    </div>
  );
}

export default HeatmapHeaderTile;
