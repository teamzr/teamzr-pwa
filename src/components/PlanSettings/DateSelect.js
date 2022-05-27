import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import * as React from 'react';

export default function DateSelect(props) {
  return (
    <KeyboardDatePicker format={'DD/MM/YY'} minDate={moment()} fullWidth left />
  );
}
