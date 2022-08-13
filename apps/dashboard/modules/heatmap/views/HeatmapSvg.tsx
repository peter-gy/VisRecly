type HeatmapSvgProps = {
  width: number;
  height: number;
};

function HeatmapSvg({ width, height }: HeatmapSvgProps) {
  return <svg width={width} height={height}></svg>;
}

export default HeatmapSvg;
