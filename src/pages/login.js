import * as React from 'react';
import { Grid, Container, Box, Typography, Divider } from '@material-ui/core';
import { useRouter } from 'next/router';

import { Logo } from '../constants/Icons';
import LoginFormComponent from '../components/LoginForm/LoginFormComponent';
import { useLoginPageStyle } from '../pagesStyle/login.Style';
import useAuthContext from '../context/AuthContext';
import { useLoginFormTextField } from '../components/LoginForm/LoginFormTextField.Style';
import LogoPublicTitlePanel from '../components/LogoPublicTitlePanel';

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
    <div className={classes.background}>
      <Container maxWidth={'sm'}>
        <Grid
          container
          direction={'column'}
          alignContent={'strech'}
          alignItems={'stretch'}
          className={classes.container}
          justify={'center'}
          spacing={5}
        >
          <Grid item xs={12}>
            <Grid
              container
              direction={'row'}
              justify={'center'}
              alignItems={'stretch'}
              alignContent={'center'}
            >
              <LogoPublicTitlePanel title={'Log In'} />
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction={'row'} justify={'center'}>
              <Grid item xs={12} md={8}>
                <LoginFormComponent />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LogIn;
