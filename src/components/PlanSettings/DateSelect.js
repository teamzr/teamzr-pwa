import { KeyboardDatePicker } from '@material-ui/pickers';
import * as React from 'react';

export default function DateSelect({ value, onChange, minDate, ...props }) {
  return (
    <KeyboardDatePicker
      fullWidth
      format={'DD.MM.YYYY'}
      minDate={minDate}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
