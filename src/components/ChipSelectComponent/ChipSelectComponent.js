import * as React from 'react';
import propTypes from 'prop-types';
import ChipSelectOption from './ChipSelectOption';
import { makeStyles } from '@material-ui/core';

function ChipSelectComponent(props) {
  const { disabled, value, options, onChange } = props;
  const classes = useChipsetSelectComponent();
  return (
    <div className={classes.container}>
      {options.map((opt, key) => (
        <div key={key} className={classes.chipContainer}>
          <ChipSelectOption
            disabled={disabled}
            checked={value == opt.value}
            value={opt.value}
            label={opt.label}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  );
}

ChipSelectComponent.propTypes = {
  options: propTypes.array,
};

const useChipsetSelectComponent = makeStyles((theme) => ({
  container: {
    overflowX: 'scroll',
    overflowY: 'hidden',
    width: '100%',
    display: 'flex',
  },
  chipContainer: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
}));

export default ChipSelectComponent;
