import * as React from 'react';
import { TextField } from '@material-ui/core';

const LoginFormTextField = React.forwardRef((props, ref) => {
  return <TextField inputProps={{ ref }} {...props} />;
});

export default LoginFormTextField;
