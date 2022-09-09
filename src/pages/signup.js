import * as React from 'react';
import { Grid, Container, Box, Typography, Link } from '@material-ui/core';
import { useRouter } from 'next/router';

import { LogoTeamzrVertical } from '../constants/Icons';

import { useStartPageStyle } from '../pagesStyle/start.Style';
import useAuthContext from '../context/AuthContext';
import SignupFormComponent from '../components/SignupForm';
import AuthService from '../services/AuthService';

function SignUp() {
  const authContext = useAuthContext();
  const classes = useStartPageStyle();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleBack = () => {
    router.push('/');
  };

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
            {<SignupFormComponent onSubmit={AuthService.signUp} />}
          </Grid>
          <Grid item>
            <Grid
              container
              direction={'row'}
              justify={'center'}
              alignContent={'flex-end'}
              alignItems={'baseline'}
              spacing={1}
            >
              <Grid item>
                <Link href="#" onClick={handleLogin} color={'secondary'}>
                  Log In
                </Link>
              </Grid>
              <Grid item>
                <Typography color={'secondary'}> or </Typography>
              </Grid>
              <Grid item>
                <Link href="#" onClick={handleBack} color={'secondary'}>
                  Go Back
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SignUp;
