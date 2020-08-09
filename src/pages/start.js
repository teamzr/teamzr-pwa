import * as React from 'react';
import { Grid, Container, Box } from '@material-ui/core';
import { useRouter } from 'next/router';

import { LogoTeamzrVertical } from '../constants/Icons';
import LoginFormComponent from '../components/LoginForm/LoginFormComponent';
import { useStartPageStyle } from '../pagesStyle/start.Style';
import useAuthContext from '../context/AuthContext';
import LoginButton from '../components/buttons/LoginButton';

function Start() {
  const authContext = useAuthContext();
  const classes = useStartPageStyle();
  const router = useRouter();

  const handleLogin = React.useCallback(() => {
    router.push('/login');
  }, [router]);

  const handleSignUp = React.useCallback(() => {
    router.push('/signup');
  }, [router]);

  React.useEffect(() => {
    if (authContext.isAuthenticated && !authContext.loading) {
      router.push('/');
    }
  }, [authContext]);

  return (
    <div className={classes.background}>
      <Container>
        <Grid
          container
          direction={'column'}
          alignItems={'center'}
          alignContent={'center'}
          className={classes.container}
          justify={'center'}
          spacing={2}
        >
          <Grid item xs={12} className={classes.logoContainer}>
            <LogoTeamzrVertical className={classes.logo} />
          </Grid>
          <Grid item xs={12}>
            <LoginButton
              fullWidth={true}
              variant={'contained'}
              color={'secondary'}
              onClick={handleLogin}
            >
              Log In
            </LoginButton>
          </Grid>
          <Grid item xs={12}>
            <LoginButton
              fullWidth={true}
              variant={'outlined'}
              onClick={handleSignUp}
              color={'secondary'}
            >
              Sign Up
            </LoginButton>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Start;
