import { useRecInput } from '@dashboard/modules/rec-input/provider/RecInputContext';

/**
 * Access the `Schema` of the currently picked dataset.
 */
function useDataSchema() {
  const {
    state: { draco },
  } = useRecInput();
  return draco.schema;
}

export default useDataSchema;
