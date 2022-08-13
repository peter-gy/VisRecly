import { scaleQuantize } from '@visx/scale';

export type ScaleSection = {
  name: string;
  range: [number, number];
  color: string;
};

const scaleSectionData: Omit<ScaleSection, 'range'>[] = [
  { name: 'Good', color: '#76d275' },
  { name: 'Medium', color: '#ffeb3b' },
  { name: 'Bad', color: '#ff5f52' },
];

const scaleRange = [0, 100];
const absoluteRange = scaleRange[1] - scaleRange[0];
const numSections = scaleSectionData.length;

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
