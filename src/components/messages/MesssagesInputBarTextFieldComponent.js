import * as React from 'react';
import propTypes from 'prop-types';
import { TextField, makeStyles, ThemeProvider } from '@material-ui/core';
import clsx from 'clsx';

function MessagesInputBarTextFieldComponent(props) {
  const { value, onFocus, onBlur, multiline, onChange, onKeyDown } = props;
  const classes = useMessagesInputBarTextFieldComponent();

  return (
    <TextField
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      classes={{ root: clsx(classes.root, { [classes.multiline]: multiline }) }}
      fullWidth
      multiline
      InputProps={{
        disableUnderline: true,
        fullWidth: true,
      }}
    />
  );
}
MessagesInputBarTextFieldComponent.proTypes = {
  value: propTypes.string,
  multiline: propTypes.bool,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  onChange: propTypes.func,
  onKeyDown: propTypes.func,
};

const useMessagesInputBarTextFieldComponent = makeStyles((theme) => ({
  root: {
    borderRadius: '20px',
    height: '35px',
    overflowY: 'scroll',
    padding: theme.spacing(),
  },
  multiline: {
    height: '75px',
  },
}));

export default MessagesInputBarTextFieldComponent;
