import * as React from 'react';
import { Grid } from '@material-ui/core';
import LoginFormBtnComponent from './LoginFormBtnComponent';
import LoginFormTextField from './LoginFormTextField';
import useAuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';

function LoginFormComponent(props) {
  const [error, setError] = React.useState(null);
  const authContext = useAuthContext();
  const emailRef = React.useRef();
  const passRef = React.useRef();
  const router = useRouter();

  const handleSubmit = React.useCallback(async () => {
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    try {
      await authContext.login(email, pass);
      router.push('/');
    } catch (e) {
      setError(e.message);
    }
  }, [emailRef, passRef]);

  return (
    <Grid container direction={'column'} alignItems={'center'} spacing={2}>
      <Grid item>
        <LoginFormTextField ref={emailRef} />
      </Grid>
      <Grid item>
        <LoginFormTextField ref={passRef} type={'password'} />
      </Grid>
      <Grid item>
        <LoginFormBtnComponent onClick={handleSubmit} />
      </Grid>
    </Grid>
  );
}

export default LoginFormComponent;
