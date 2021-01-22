import * as React from 'react';
import { Chip, Grid, Paper, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

import LoginFormBtnComponent from './LoginFormBtnComponent';
import LoginFormTextField from './LoginFormTextField';
import useAuthContext from '../../context/AuthContext';
import { LetterIcon, LockIcon, MessagesIcon } from '../../constants/Icons';

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

  const handleDeleteError = React.useCallback(() => {
    setError(null);
  }, [setError]);

  const keyEnterPress = React.useCallback(
    (e) => {
      if (e.keyCode == 13) {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'stretch'}
      justify={'center'}
      spacing={2}
    >
      <Grid item xs={12}>
        <LoginFormTextField
          onKeyDown={keyEnterPress}
          ref={emailRef}
          icon={<LetterIcon />}
          error={error}
          placeholder={'your@email.com'}
        />
      </Grid>
      <Grid item xs={12}>
        <LoginFormTextField
          ref={passRef}
          icon={<LockIcon />}
          type={'password'}
          onKeyDown={keyEnterPress}
          placeholder={'**********'}
          error={error}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction={'row'}
          alignItems={'center'}
          alignContent={'center'}
          justify={'center'}
        >
          <Grid item style={{ marginBottom: 12, minHeight: 32 }}>
            {error && (
              <Chip
                icon={<MessagesIcon />}
                label={error}
                onDelete={handleDeleteError}
                color={'primary'}
              />
            )}
          </Grid>

          <Grid item xs={6}>
            <LoginFormBtnComponent onClick={handleSubmit} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginFormComponent;
