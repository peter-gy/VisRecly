import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { theme } from 'twin.macro';

import {
  scaleSections,
  sectionNameScale,
} from '@dashboard/modules/heatmap/beans/scale';
import {
  OnboardingSection,
  onboardingStep,
} from '@dashboard/modules/onboarding/utils/utils';
import { useRecSelection } from '@dashboard/modules/rec-selection/provider/RecSelectionContext';

function HeatmapScale() {
  const [width, height] = [55, 500];
  const sectionHeight = height / scaleSections.length;
  const scaleValues = [
    scaleSections[0].range[0],
    ...scaleSections.map(({ range: [_, max] }) => max),
  ];
  const scaleMin = scaleValues[0];
  const scaleMax = scaleValues[scaleValues.length - 1];
  const tickScale = scaleLinear({
    domain: [scaleMin, scaleMax],
    range: [0, height],
  });

  const {
    state: { activeRec },
  } = useRecSelection();
  const activeScaleName =
    activeRec !== undefined
      ? sectionNameScale(activeRec.overallCost)
      : undefined;

  return (
    <div className="bg-primary-100 rounded-r-lg shadow-inner pr-1.5">
      <svg
        id={onboardingStep(OnboardingSection.HeatmapScale)}
        width={1.75 * width}
        height={1.1 * height}
      >
        <Group transform={`translate(0, ${0.05 * height})`}>
          {scaleSections.map(({ name, color, range }, idx) => (
            <ScaleSectionRect
              key={`scale-section-${idx}`}
              idx={idx}
              label={name}
              color={color}
              width={width}
              height={sectionHeight}
              highlighted={name === activeScaleName}
            />
          ))}
        </Group>
        <Group transform={`translate(0, ${0.05 * height})`}>
          <ScaleTicks
            scaleWidth={width}
            scaledTickValues={scaleValues.map(tickScale)}
            tickLabels={scaleValues.map((v) => v.toFixed(1)).reverse()}
          />
        </Group>
      </svg>
    </div>
  );
}

type ScaleSectionRectProps = {
  idx: number;
  label: string;
  color: string;
  width: number;
  height: number;
  highlighted: boolean;
};

function ScaleSectionRect({
  idx,
  label,
  color,
  width,
  height,
  highlighted,
}: ScaleSectionRectProps) {
  const x = 0;
  const y = idx * height;
  return (
    <Group transform={`translate(${x}, ${y})`}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        style={{
          fill: color,
          ...(highlighted && {
            stroke: theme`colors.primary.900`,
            strokeWidth: 4,
          }),
        }}
      />
      <text
        x={width / 2}
        y={height / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-xs"
      >
        {label}
      </text>
    </Group>
  );
}

type ScaleTicksProps = {
  scaleWidth: number;
  scaledTickValues: number[];
  tickLabels: string[];
};

function ScaleTicks({
  scaleWidth,
  scaledTickValues,
  tickLabels,
}: ScaleTicksProps) {
  const x1 = 0.8 * scaleWidth;
  const x2 = 1.1 * scaleWidth;
  const textX = 1.4 * scaleWidth;
  return (
    <>
      {scaledTickValues.map((scaledTickValue, idx) => (
        <Group key={`scale-tick-line-${idx}`}>
          <line
            x1={x1}
            x2={x2}
            y1={scaledTickValue}
            y2={scaledTickValue}
            style={{
              stroke: '#000',
              strokeWidth: 1.5,
            }}
          />
          <text
            x={textX}
            y={scaledTickValue}
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-xs"
          >
            {tickLabels[idx]}
          </text>
        </Group>
      ))}
    </>
  );
}

export default HeatmapScale;
