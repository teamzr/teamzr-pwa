import * as React from 'react';
import { Chip } from '@material-ui/core';
import propTypes from 'prop-types';

function ChipSelectOption(props) {
  const { disabled, value, onChange, label, checked } = props;

  const onClick = () => {
    onChange(value);
  };

  return (
    <Chip
      disabled={disabled}
      color={'primary'}
      label={label}
      onClick={onClick}
      variant={checked ? 'default' : 'outlined'}
    />
  );
}

ChipSelectOption.propTypes = {
  value: propTypes.any,
  label: propTypes.string,
  checked: propTypes.bool,
  onChange: propTypes.func,
};

export default ChipSelectOption;
