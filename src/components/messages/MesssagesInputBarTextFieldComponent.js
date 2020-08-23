import * as React from 'react';
import proTypes from 'prop-types';
import { TextField, makeStyles, ThemeProvider } from '@material-ui/core';
import clsx from 'clsx';

function MessagesInputBarTextFieldComponent(props) {
  const { input, onFocus, onBlur, multiline, onChange } = props;
  const classes = useMessagesInputBarTextFieldComponent();

  return (
    <TextField
      value={input}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
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
  value: proTypes.string,
  multiline: proTypes.bool,
  onFocus: proTypes.func,
  onBlur: proTypes.func,
  onChange: proTypes.func,
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
