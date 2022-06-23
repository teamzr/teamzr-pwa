import { TextField } from '@material-ui/core';
import * as React from 'react';

export function TextFieldComponent({
  name,
  value,
  maxlength,
  onChange,
  ...props
}) {
  const handleChange = (e) => {
    // TODO: Delay timeout – not trigger after every chage
    onChange(e.target.value);
  };

  return (
    <TextField
      fullWidth
      value={value}
      onChange={handleChange}
      name={name}
      inputProps={{ maxlength }}
      InputProps={{
        endAdornment:
          !!maxlength && `${(!!value && value.length) || 0}/${maxlength}`,
        minRows: 3,
      }}
      autoComplete={false}
      {...props}
    />
  );
}
