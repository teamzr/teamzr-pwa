import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';

export default function SelectComponent(props) {
  const { id, label, options, value, onChange, ...rest } = props;

  const handleOnChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <FormControl fullWidth {...rest}>
      <InputLabel id={`select-component` + id}>{label}</InputLabel>
      <Select
        labelId={`select-component` + id}
        value={value}
        onChange={handleOnChange}
      >
        {options.map((opt) => (
          <MenuItem value={opt.value}>{opt.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
