import * as React from 'react';
import {
  Grid,
  Container,
  Box,
  Typography,
  Divider,
  Button,
  Link,
} from '@material-ui/core';
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

  const handleBack = React.useCallback(() => {
    router.push('/');
  });
  const handleSignup = React.useCallback(() => {
    router.push('/signup');
  });
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
          <Grid item xs={12} style={{ marginBottom: 24 }}>
            <Grid
              container
              direction={'row'}
              justify={'center'}
              alignItems={'stretch'}
              alignContent={'center'}
            >
              <LogoPublicTitlePanel title={'Log In'} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction={'row'} justify={'center'}>
              <Grid item xs={12} md={8}>
                <LoginFormComponent />
              </Grid>
            </Grid>
            <Grid
              container
              direction={'row'}
              justify={'center'}
              alignContent={'flex-end'}
              alignItems={'baseline'}
              spacing={1}
            >
              <Grid item>
                <Link href="#" onClick={handleSignup} color={'secondary'}>
                  Sign Up
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

export default LogIn;
