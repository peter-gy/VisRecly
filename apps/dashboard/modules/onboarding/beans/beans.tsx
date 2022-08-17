import { Step } from 'intro.js-react';

import { TASKS } from '@visrecly/vis-tasks';

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
          You can select data columns of your interest by clicking on them.
          <br />
          Selected columns are highlighted with a{' '}
          <span className="p-1 bg-primary-700 text-white">darker color</span>.
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
          Recommendations are generated & ranked for you on the fly, and
          displayed in this list.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.RecListItem,
    intro: (
      <>
        <p>
          <Emoji label="eye" symbol="👀" />
          For the current data selection, this is the overall best
          recommendation.
          <br />
          You can inspect it in more detail by clicking on it.
          <br />
          <br />
          <Emoji label="open file folder" symbol="📂" />
          You can also export your recommendations to a file in the detail view.
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
    element: OnboardingSection.HeatmapHeaderTile,
    intro: (
      <>
        <p>
          <Emoji label="bullseye" symbol="🎯" />
          Every column header represents a visualization task, an objective that
          you would like to reach with a given chart. Cells in this column
          represent the ranking of the generated recommendations.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.HeatmapRankTile,
    intro: (
      <>
        <p>
          <Emoji label="pin" symbol="📍" />
          The position of a cell represents the rank of the associated
          visualization for tasks.
          <br />
          <br />
          Cells in this row will refer to recommendations which are the best for
          a given task.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.HeatmapTile,
    intro: (
      <>
        <p>
          <Emoji label="gold medal" symbol="🥇" />
          For example, the visualization associated with this cell is the best
          pick for the{' '}
          <span className="italic p-1 bg-primary-200">
            {TASKS[0].name}
          </span>{' '}
          task. This is because we are looking at the cell in the 1st row under
          the <span className="italic p-1 bg-primary-200">{TASKS[0].name}</span>{' '}
          column.
          <br />
          <br />
          <Emoji label="wand" symbol="🪄" />
          Whenever you move your mouse onto a cell, the visualization it
          represents will be highlighted.
          <br />
          You can click the cell too to open the recommendation details.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.HeatmapScale,
    intro: (
      <>
        <p>
          <Emoji label="trophy" symbol="🏆" />
          This scale indicates the potential rank-categories of recommendations.
          <br />
          <br />
          <Emoji label="exclamation mark" symbol="❗️" />
          Note that a recommendation can be still useful for a given task even
          if it has a poor overall rank-category.
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
  {
    element: OnboardingSection.DrawerCloser,
    intro: (
      <>
        <p>
          <Emoji label="backhand index finger pointing left" symbol="👈" />
          If you need more space on the screen, you can close the drawer using
          this button.
        </p>
      </>
    ),
  },
  {
    element: OnboardingSection.AppInfo,
    intro: (
      <>
        <p>
          <Emoji label="repeat symbol" symbol="🔁" />
          You can access these hints again at any time by clicking on this
          button. <br />
          <br />
          Now dismiss this hint and let&apos;s explore the system!{' '}
          <Emoji label="rocket" symbol="🚀" />
        </p>
      </>
    ),
  },
].map((step) => ({ ...step, element: `#${step.element}` }));

export const initialStep = 0;
