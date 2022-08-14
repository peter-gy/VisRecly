import { DataSet } from '@visrecly/data';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import {
  OnboardingSection,
  onboardingStep,
} from '@dashboard/modules/onboarding/utils/utils';
import { useRecInput } from '@dashboard/modules/rec-input/provider/RecInputContext';

function DataSetSelector() {
  const {
    state: { availableDatasets, selectedDataset },
    dispatch,
  } = useRecInput();
  const onSelect = (dataSet: DataSet) => {
    dispatch({ type: 'setSelectedDataset', data: dataSet });
  };
  return (
    <_DataSetSelector
      availableDatasets={availableDatasets}
      selectedDataset={selectedDataset}
      onSelect={onSelect}
    />
  );
}

type DataSetSelectorProps = {
  availableDatasets: DataSet[];
  selectedDataset: DataSet;
  onSelect: (dataset: DataSet) => void;
};

function _DataSetSelector({
  availableDatasets,
  selectedDataset,
  onSelect,
}: DataSetSelectorProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const dataSetName = event.target.value;
    const selection = availableDatasets.find(
      ({ name }) => name === dataSetName,
    );
    if (selection) {
      onSelect(selection);
    }
  };
  return (
    <FormControl id={onboardingStep(OnboardingSection.DataSetSelector)}>
      <InputLabel>Dataset</InputLabel>
      <Select
        label="Dataset"
        value={selectedDataset.name}
        onChange={handleChange}
      >
        {availableDatasets.map(({ name }) => (
          <MenuItem key={`dataset-${name}`} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <div className="mt-2">
        <FormHelperText style={{ margin: 0 }}>
          {selectedDataset.description} (
          <a
            href={selectedDataset.source}
            target="_blank"
            rel="noreferrer"
            className={'text-primary underline'}
          >
            Source
          </a>
          )
        </FormHelperText>
      </div>
    </FormControl>
  );
}

export default DataSetSelector;
