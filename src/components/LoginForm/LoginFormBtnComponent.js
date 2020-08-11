import * as React from 'react';
import LoginButton from '../buttons/LoginButton';

function LoginFormBtnComponent(props) {
  return (
    <LoginButton variant={'contained'} color={'secondary'} {...props}>
      Log In
    </LoginButton>
  );
}

export default LoginFormBtnComponent;
