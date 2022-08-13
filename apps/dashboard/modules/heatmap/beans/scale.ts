export type ScaleSection = {
  name: string;
  range: [number, number];
  color: string;
};

const scaleSectionData: Omit<ScaleSection, 'range'>[] = [
  { name: 'Good', color: '#00FF00' },
  { name: 'Medium', color: '#FFFF00' },
  { name: 'Bad', color: '#FF0000' },
];

const scaleRange = [0, 10];
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
