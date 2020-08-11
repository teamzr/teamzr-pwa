import * as React from 'react';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';

import LoginFormBtnComponent from './LoginFormBtnComponent';
import LoginFormTextField from './LoginFormTextField';
import useAuthContext from '../../context/AuthContext';
import { LetterIcon, LockIcon } from '../../constants/Icons';

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
    <Grid
      container
      direction={'column'}
      alignItems={'stretch'}
      justify={'center'}
      spacing={2}
    >
      <Grid item xs={12}>
        <LoginFormTextField ref={emailRef} icon={<LetterIcon />} />
      </Grid>
      <Grid item xs={12}>
        <LoginFormTextField
          ref={passRef}
          icon={<LockIcon />}
          type={'password'}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction={'row'}
          alignItems={'stretch'}
          alignContent={'stretch'}
          justify={'center'}
        >
          <Grid item xs={6}>
            <LoginFormBtnComponent onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginFormComponent;
