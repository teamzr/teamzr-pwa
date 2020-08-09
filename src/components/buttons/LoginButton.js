import * as React from 'react';
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useLoginButtonStyle } from './LoginButton.Style';

function LoginButton(props) {
  const { children } = props;
  const classes = useLoginButtonStyle();
  return (
    <Button classes={{ root: classes.root }} {...props}>
      {children}
    </Button>
  );
}

export default LoginButton;
