import * as React from 'react';
import { Grid, Container, Box, Typography, Divider } from '@material-ui/core';
import { useRouter } from 'next/router';

import { Logo } from '../constants/Icons';
import LoginFormComponent from '../components/LoginForm/LoginFormComponent';
import { useLoginPageStyle } from '../pagesStyle/login.Style';
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
    <div className={classes.background}>
      <Container maxWidth={'sm'}>
        <Grid
          container
          direction={'column'}
          alignContent={'strech'}
          alignItems={'stretch'}
          className={classes.container}
          justify={'center'}
        >
          <Grid item>
            <Grid
              container
              direction={'row'}
              alignContent={'center'}
              alignItems={'center'}
              justify={'center'}
              spacing={5}
            >
              <Grid item xs={4}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={4}>
                <Grid
                  container
                  direction={'column'}
                  justify={'center'}
                  alignItems={'center'}
                  alignItems={'center'}
                  spacing={1}
                >
                  <Grid item xs={12}>
                    <Logo className={classes.logo} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      color={'secondary'}
                      variant={'h4'}
                      className={classes.title}
                    >
                      Log In
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Divider className={classes.divider} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction={'row'} justify={'center'}>
              <Grid item>
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
