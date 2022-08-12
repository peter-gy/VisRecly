import { Group } from '@visx/group';

function HeatmapScale() {
  const [width, height] = [50, 500];
  return (
    <svg width={width} height={height}>
      <Group></Group>
    </svg>
  );
}

export default HeatmapScale;
