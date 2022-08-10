import { useRecInput } from '@dashboard/modules/rec-input/provider/RecInputContext';
import { DataColumn as DataColumnType } from '@dashboard/modules/rec-input/types/types';

function DataColumnSelector() {
  const {
    state: { availableDataColumns, selectedDataColumns },
    dispatch,
  } = useRecInput();
  const handleSelect = (columns: DataColumnType[]) => {};
  return (
    <_DataColumnSelector
      availableDataColumns={availableDataColumns}
      selectedDataColumns={selectedDataColumns}
      onSelect={handleSelect}
    />
  );
}

type DataColumnSelectorProps = {
  availableDataColumns: DataColumnType[];
  selectedDataColumns: DataColumnType[];
  onSelect: (columns: DataColumnType[]) => void;
};

function _DataColumnSelector({
  availableDataColumns,
  selectedDataColumns,
}: DataColumnSelectorProps) {
  return (
    <div className="flex flex-col">
      {availableDataColumns.map(({ name, type }) => {
        const isSelected = true;
        return (
          <DataColumn
            key={`data-column-${name}`}
            name={name}
            type={type}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
}

type DataColumnProps = {
  name: string;
  type: string;
  isSelected: boolean;
};

function DataColumn({ name, type, isSelected }: DataColumnProps) {
  return (
    <div>
      {name} - {type} - {JSON.stringify(isSelected)}
    </div>
  );
}

export default DataColumnSelector;
