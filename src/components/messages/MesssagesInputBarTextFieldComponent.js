import * as React from 'react';
import proTypes from 'prop-types';
import { TextField, makeStyles, ThemeProvider } from '@material-ui/core';
import clsx from 'clsx';

function MessagesInputBarTextFieldComponent(props) {
  const { onFocus, onBlur, multiline } = props;
  const classes = useMessagesInputBarTextFieldComponent();
  return (
    <TextField
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
  multiline: proTypes.bool,
  onFocus: proTypes.func,
  onBlur: proTypes.func,
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
