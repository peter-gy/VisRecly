import { scaleQuantize } from '@visx/scale';
import { theme } from 'twin.macro';

export type ScaleSection = {
  name: string;
  range: [number, number];
  color: string;
};

const scaleSectionData: Omit<ScaleSection, 'range'>[] = [
  { name: 'Good', color: theme`colors.scale.good` },
  { name: 'Average', color: theme`colors.scale.average` },
  { name: 'Poor', color: theme`colors.scale.poor` },
  { name: 'Bad', color: theme`colors.scale.bad` },
];

export const scaleRange = [0, 100];
const absoluteRange = scaleRange[1] - scaleRange[0];
const numSections = scaleSectionData.length;

export function normalizeCost(cost: number): number {
  return scaleRange[1] - cost;
}

export const scaleSections: ScaleSection[] = scaleSectionData.map(
  ({ name, color }, idx) => ({
    name,
    color,
    range: [
      idx * (absoluteRange / numSections),
      (idx + 1) * (absoluteRange / numSections),
    ],
  }),
);

export const colorScale = scaleQuantize<string>({
  domain: [scaleRange[0], scaleRange[1]],
  range: scaleSections.map(({ color }) => color),
});

export const sectionNameScale = scaleQuantize<string>({
  domain: [scaleRange[0], scaleRange[1]],
  range: scaleSections.map(({ name }) => name),
});
