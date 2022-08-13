import { forwardRef } from 'react';

import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ErrorMessageProps = {
  message: string;
  severity?: AlertColor;
};

function AlertMessage({ message, severity = 'warning' }: ErrorMessageProps) {
  return <Alert severity={severity}>{message}</Alert>;
}

export default AlertMessage;
