import * as React from 'react';
import { Grid, Container, Box, Typography, Link } from '@material-ui/core';
import { useRouter } from 'next/router';

import { LogoTeamzrVertical } from '../constants/Icons';

import { useStartPageStyle } from '../pagesStyle/start.Style';
import useAuthContext from '../context/AuthContext';
import axios from '../utils/Axios';
import SetNewPasswordFormComponent from '../components/passwordReset/SetNewPasswordFormComponent';
import { signupValidationSchema } from '../components/passwordReset/SetNewPasswordForm.Func';
import { processValidationError } from '../components/SignupForm/SignupFormComponent.func';

function SetNewPassword() {
  const authContext = useAuthContext();
  const classes = useStartPageStyle();
  const router = useRouter();

  const [errors, setErrors] = React.useState({
    newPass: null,
    newPassConfirm: null,
  });

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

  const onSubmit = async (pass) => {
    try {
      const result = await signupValidationSchema.validate(pass, {
        abortEarly: false,
      });
      await axios.post(`/set-new-password?token=${router.query.token}`, {
        newPass: result.newPass,
        newPassConfirm: result.newPassConfirm,
      });
      router.push('/login');
    } catch (error) {
      const errors = processValidationError(error);
      console.log(errors);
      setErrors(errors);
    }
  };

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
            <Typography variant={'h5'} color={'secondary'}>
              Set New Password
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SetNewPasswordFormComponent errors={errors} onSubmit={onSubmit} />
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

export default SetNewPassword;
