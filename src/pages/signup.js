import * as React from 'react';
import { Grid, Container, Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

import { LogoTeamzrVertical } from '../constants/Icons';
import LoginFormComponent from '../components/LoginForm/LoginFormComponent';
import { useStartPageStyle } from '../pagesStyle/start.Style';
import useAuthContext from '../context/AuthContext';
import LoginButton from '../components/buttons/LoginButton';

function SignUp() {
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
        >
          <Grid item xs={12}>
            <LogoTeamzrVertical className={classes.logo} />
          </Grid>
          <Grid item xs={12}>
            <Typography color={'secondary'}>Coming soon...</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SignUp;
