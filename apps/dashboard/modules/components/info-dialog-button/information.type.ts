import { ReactNode } from 'react';

/**
 * Information dialog button props.
 */
export type Information = {
  /**
   * Tooltip label
   */
  tooltip: string;

  /**
   * Dialog title
   */
  title: string;

  /**
   * Dialog content
   */
  description: string | ReactNode;
};
