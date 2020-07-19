import * as React from 'react';
import { Grid, Container, Box } from '@material-ui/core';
import { useRouter } from 'next/router';

import { Logo } from '../constants/Icons';
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
    <Container classes={{ root: classes.container }}>
      <Grid container direction={'column'} alignItems={'center'}>
        <Grid item xs={4}>
          <Logo className={classes.logo} />
        </Grid>
        <Grid item xs={4}>
          <LoginFormComponent />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
}

export default LogIn;
