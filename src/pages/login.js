import * as React from 'react';
import { Grid, Container, Box } from '@material-ui/core';
import { useRouter } from 'next/router';

import { LogoIcon } from '../constants/Icons';
import LoginFormComponent from '../components/LoginForm/LoginFormComponent';
import { useLoginPageStyle } from './login.Style';
import useAuthContext from '../context/AuthContext';

function LogIn() {
  const authContext = useAuthContext();
  const classes = useLoginPageStyle();
  const router = useRouter();

  React.useEffect(() => {
    if (authContext.isAuthenticated && !authContext.loading) {
      router.push('/');
    }
  }, [authContext]);

  return (
    <Container>
      <Grid container direction={'column'} alignItems={'center'}>
        <Grid item>
          <LogoIcon className={classes.logo} />
        </Grid>
        <Grid item>
          <LoginFormComponent />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
}

export default LogIn;
