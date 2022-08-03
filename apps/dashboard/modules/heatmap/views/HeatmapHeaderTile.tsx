import { useState } from 'react';

import VisibilityOnIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import { Information } from '../../components/info-dialog-button/information.type';
import InfoDialogButton from '../../components/info-dialog-button/views/InfoDialogButton';

export type HeatmapHeaderTileProps = {
  title: string;
  info: Information;
  onVisibilityChange?: (visible: boolean) => void;
};

function HeatmapHeaderTile({
  title,
  info,
  onVisibilityChange,
}: HeatmapHeaderTileProps) {
  const [visible, setVisible] = useState<boolean>(true);
  const VisibilityIcon = visible ? VisibilityOffIcon : VisibilityOnIcon;
  const handleVisibilityIconClick = () => {
    onVisibilityChange(!visible);
    setVisible(!visible);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-1 bg-blue-300">
      <div className="flex justify-between items-center">
        <InfoDialogButton {...info} />
        <IconButton onClick={handleVisibilityIconClick}>
          <VisibilityIcon />
        </IconButton>
      </div>
      <div>{title}</div>
    </div>
  );
}

export default HeatmapHeaderTile;
