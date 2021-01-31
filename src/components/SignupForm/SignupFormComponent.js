import * as React from 'react';
import propTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import { useRouter } from 'next/router';

import {
  processValidationError,
  validateData,
} from './SignupFormComponent.func';
import AuthService from '../../services/AuthService';
import LoginButton from '../buttons/LoginButton';
import { MessagesIcon } from '../../constants/Icons';

function SignupFormComponent(props) {
  const { onSubmit } = props;

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = React.useState({});

  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await validateData(formData);
        const response = await AuthService.signUp(formData);

        router.push('/login');
      } catch (error) {
        const processedErrors = processValidationError(error);
        setErrors({ ...processedErrors });
        console.log(error);
      }
    },
    [formData, errors, setErrors]
  );

  const handleChange = React.useCallback(
    (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setFormData({ ...formData, [name]: value });
    },
    [formData, setFormData]
  );

  const handleChangeShowPassword = React.useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword, setShowPassword]);

  const handleDeleteAlert = React.useCallback(() => {
    setErrors({ ...errors, alert: null });
  }, [errors]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction={'column'}
        spacing={2}
        style={{ minWidth: 400 }}
      >
        <Grid item>
          <TextField
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            label={'Name'}
            name={'name'}
            autoComplete={'username'}
            value={formData['name']}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            label={'Email'}
            name={'email'}
            autoComplete={'username'}
            value={formData['email']}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            type={showPassword ? 'text' : 'password'}
            label={'Password'}
            name={'password'}
            value={formData['password']}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            autoComplete={'new-password'}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
            type={showPassword ? 'text' : 'password'}
            label={'Password Confirmation'}
            name={'passwordConfirm'}
            value={formData['passwordConfirm']}
            onChange={handleChange}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm}
            autoComplete={'new-password'}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            value={'end'}
            control={<Checkbox />}
            label={'Show Password'}
            labelPlacement={'end'}
            onChange={handleChangeShowPassword}
          />
        </Grid>
        <Grid item>
          {errors.alert && (
            <Chip
              icon={<MessagesIcon />}
              label={errors.alert}
              onDelete={handleDeleteAlert}
              color={'primary'}
            />
          )}
        </Grid>
        <Grid item>
          <Grid container justify={'flex-end'} direction={'row'}>
            <Grid item>
              <LoginButton
                variant={'contained'}
                color={'secondary'}
                type={'submit'}
              >
                Sign up
              </LoginButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

SignupFormComponent.propTypes = {
  onSubmit: propTypes.func,
};

export default SignupFormComponent;
