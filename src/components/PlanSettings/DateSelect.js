import { Box, Grid } from '@material-ui/core';
import { KeyboardDatePicker, TimePicker } from '@material-ui/pickers';
import * as React from 'react';

export default function DateSelect({ value, onChange, minDate, ...props }) {
  return (
    <Grid container>
      <Grid item xs={8}>
        <KeyboardDatePicker
          fullWidth
          format={'DD.MM.YYYY'}
          minDate={minDate}
          value={value}
          onChange={onChange}
          {...props}
        />
      </Grid>
      <Grid item xs={4}>
        <TimePicker variant={'inline'} value={value} onChange={onChange} />
      </Grid>
    </Grid>
  );
}
