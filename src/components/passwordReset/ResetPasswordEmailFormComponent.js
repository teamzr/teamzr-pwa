import * as React from 'react';
import propTypes from 'prop-types';
import LoginFormTextField from '../LoginForm/LoginFormTextField';
import LoginButton from '../buttons/LoginButton';
import { Grid } from '@material-ui/core';

function ResetPasswordEmailFormComponent(props) {
  const { onSubmit } = props;

  const [email, setEmail] = React.useState('');

  const onChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const onClick = () => {
    onSubmit(email);
  };

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <LoginFormTextField
          value={email}
          onChange={onChange}
          placeholder={'Your email'}
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

export default ResetPasswordEmailFormComponent;
