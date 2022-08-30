import { GitHub } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';

function GitHubIcon() {
  return (
    <a
      href="https://github.com/peter-gy/visrecly"
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub"
    >
      <Tooltip title="Project Source Code">
        <GitHub />
      </Tooltip>
    </a>
  );
}

export default GitHubIcon;
