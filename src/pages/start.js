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

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  React.useEffect(() => {
    if (authContext.isAuthenticated && !authContext.loading) {
      router.push('/');
    }
  }, [authContext]);

  return (
    <div className={classes.background}>
      <Container maxWidth={'md'}>
        <Grid
          container
          direction={'column'}
          className={classes.container}
          justify={'center'}
          alignIntems={'center'}
          alignContent={'center'}
        >
          <Grid item xs={12}>
            <Grid
              className={classes.logoContainer}
              container
              direction={'column'}
              justify={'center'}
              alignItems={'center'}
              spacing={6}
            >
              <Grid item xs={12}>
                <Box>
                  <LogoTeamzrVertical className={classes.logo} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={9} md={6}>
            <Grid
              container
              direction={'row'}
              justify={'space-around'}
              alignContent={'center'}
              alignItems={'center'}
              spacing={2}
            >
              <Grid item xs={12}>
                <LoginButton
                  className={classes.button}
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
                  className={classes.button}
                  fullWidth={true}
                  variant={'outlined'}
                  onClick={handleSignUp}
                  color={'secondary'}
                >
                  Sign Up
                </LoginButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Start;
