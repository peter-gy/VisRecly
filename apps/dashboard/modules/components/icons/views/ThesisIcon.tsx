import PsychologyIcon from '@mui/icons-material/Psychology';
import Tooltip from '@mui/material/Tooltip';

function ThesisIcon() {
  return (
    <a
      href="/visrecly_thesis.pdf"
      target="_blank"
      rel="noreferrer"
      aria-label="Thesis"
    >
      <Tooltip title="Full Thesis">
        <PsychologyIcon />
      </Tooltip>
    </a>
  );
}

export default ThesisIcon;
