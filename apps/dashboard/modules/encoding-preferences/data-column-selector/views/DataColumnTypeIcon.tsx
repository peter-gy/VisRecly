import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NumbersIcon from '@mui/icons-material/Numbers';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import TitleIcon from '@mui/icons-material/Title';

type DataColumnTypeIconProps = {
  type: string;
};

function DataColumnTypeIcon({ type }: DataColumnTypeIconProps) {
  switch (type) {
    case 'number':
      return <NumbersIcon />;
    case 'string':
      return <TitleIcon />;
    case 'date':
      return <CalendarMonthIcon />;
    default:
      return <QuestionMarkIcon />;
  }
}

export default DataColumnTypeIcon;
