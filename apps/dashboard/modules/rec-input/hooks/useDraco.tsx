import { useRecInput } from '@dashboard/modules/rec-input/provider/RecInputContext';

/**
 * Access the `Draco` instance used for the currently picked dataset.
 *
 * Useful to pass as a DI param to the ranking function.
 */
function useDraco() {
  const {
    state: { draco },
  } = useRecInput();
  return draco;
}

export default useDraco;
