import { Step } from 'intro.js-react';

import Emoji from '@dashboard/modules/components/emoji/views/Emoji';
import { OnboardingSection } from '@dashboard/modules/onboarding/utils/utils';

export const steps: Step[] = [
  {
    element: OnboardingSection.AppTitle,
    intro: (
      <>
        <p>
          <Emoji label="waving hand" symbol="👋" />
          Welcome to VisRecly, an experimental visualization recommender system,
          focusing on YOUR goals!
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.DataSetSelector,
    intro: (
      <>
        <p>
          <Emoji label="bar chart" symbol="📊" />
          You can pick from pre-defined sets of data to get started.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.DataColumnSelector,
    intro: (
      <>
        <p>
          <Emoji label="right-pointing magnifier glass" symbol="🔎" />
          You can select data columns of your interest.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.RecList,
    intro: (
      <>
        <p>
          <Emoji label="rocket" symbol="🚀" />
          Recommendations are generated for you on the fly, and displayed in
          this list. You can inspect a recommendation in more detail by clicking
          on it.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.HeatmapHeader,
    intro: (
      <>
        <p>
          <Emoji label="chart with upwards trend" symbol="📈" />
          Recommendations are ranked with regards to visualization tasks too.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.HeatmapScale,
    intro: (
      <>
        <p>
          <Emoji label="gold medal" symbol="🥇" />
          This scale indicates the potential rank-categories of recommendations.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.Heatmap,
    intro: (
      <>
        <p>
          <Emoji label="bullseye" symbol="🎯" />
          In this heatmap every cell represents a recommendation.
          <ul>
            <li>
              The cell color indicates how useful the visualization is overall.
            </li>
            <li>
              The cell vertical position indicate how useful the visualization
              is for the given task
            </li>
          </ul>
        </p>
      </>
    ),
  },
].map((step) => ({ ...step, element: `#${step.element}` }));

export const initialStep = 0;
