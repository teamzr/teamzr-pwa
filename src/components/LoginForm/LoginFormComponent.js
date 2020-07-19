import * as React from 'react';
import { Grid } from '@material-ui/core';
import LoginFormBtnComponent from './LoginFormBtnComponent';
import LoginFormTextField from './LoginFormTextField';
import useAuthContext from '../../context/AuthContext';

function LoginFormComponent(props) {
  const authContext = useAuthContext();
  const emailRef = React.useRef();
  const passRef = React.useRef();

  const handleSubmit = React.useCallback(() => {
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    authContext.login(email, pass);
  }, [emailRef, passRef]);

  return (
    <Grid container direction={'column'} alignItems={'center'} spacing={2}>
      <Grid item xs={12}>
        <LoginFormTextField ref={emailRef} />
      </Grid>
      <Grid item xs={12}>
        <LoginFormTextField ref={passRef} type={'password'} />
      </Grid>
      <Grid item xs={12}>
        <LoginFormBtnComponent onClick={handleSubmit} />
      </Grid>
    </Grid>
  );
}

export default LoginFormComponent;
