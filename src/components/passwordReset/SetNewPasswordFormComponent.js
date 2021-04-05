import * as React from 'react';
import propTypes from 'prop-types';
import LoginFormTextField from '../LoginForm/LoginFormTextField';
import { Grid } from '@material-ui/core';
import LoginButton from '../buttons/LoginButton';

function SetNewPasswordFormComponent(props) {
  const { onSubmit, errors } = props;

  const [pass, setPass] = React.useState({ newPass: '', newPassConfirm: '' });

  const onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setPass({ ...pass, [name]: value });
  };

  const onClick = () => {
    onSubmit(pass);
  };

  return (
    <Grid container direction={'column'} spacing={3}>
      <Grid item>
        <LoginFormTextField
          name={'newPass'}
          placeholder={'New password'}
          value={pass.newPass}
          error={errors.newPass}
          helperText={errors.newPass}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <LoginFormTextField
          placeholder={'Confirm new password'}
          name={'newPassConfirm'}
          value={pass.newPassConfirm}
          error={errors.newPassConfirm}
          helperText={errors.newPassConfirm}
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <LoginButton
          variant={'contained'}
          color={'secondary'}
          onClick={onClick}
        >
          Submit
        </LoginButton>
      </Grid>
    </Grid>
  );
}

export default SetNewPasswordFormComponent;
