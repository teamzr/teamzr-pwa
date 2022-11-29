import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';
import * as React from 'react';

export default function UserMultiSelectComponent(props) {
  const { id, label, value, options, onChange, ...rest } = props;

  const handleOnChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <FormControl fullWidth {...rest}>
      <InputLabel id={`select-component` + id}>{label}</InputLabel>
      <Select
        labelId={`select-component` + id}
        multiple
        multiline
        rows={3}
        value={value}
        onChange={handleOnChange}
        renderValue={(selected) => (
          <Box>
            {selected.map((val) => (
              <>
                <Chip
                  color={'primary'}
                  size={'medium'}
                  key={val}
                  label={options.find((v) => v.value == val).label}
                />
              </>
            ))}
          </Box>
        )}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            <Checkbox color="primary" checked={value.indexOf(opt.value) > -1} />
            <ListItemText primary={opt.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
