import * as React from 'react';
import propTypes from 'prop-types';
import { TextField, InputAdornment, Grid } from '@material-ui/core';

import { useLoginFormTextField } from './LoginFormTextField.Style';

const LoginFormTextField = React.forwardRef((props, ref) => {
  const { icon, error } = props;
  const classes = useLoginFormTextField();
  return (
    <TextField
      classes={{ root: classes.textField }}
      error={error}
      inputProps={{ ref, error }}
      InputProps={{
        classes: { root: classes.root },
        disableUnderline: true,
        error: error,
        startAdornment: (
          <>
            {!!icon && (
              <InputAdornment
                variant={'outlined'}
                className={classes.adorment}
                position={'start'}
              >
                <Grid
                  container
                  directio={'column'}
                  justify={'center'}
                  alignContent={'center'}
                  alignItems={'center'}
                >
                  <Grid item xs={'auto'}>
                    <Grid
                      container
                      directio={'column'}
                      justify={'center'}
                      alignContent={'center'}
                      alignItems={'center'}
                    >
                      <Grid item xs={'auto'}>
                        {icon}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </InputAdornment>
            )}
          </>
        ),
      }}
      FormHelperTextProps={{ classes: { root: classes.helperText } }}
      classes={{ root: classes.root }}
      {...props}
    />
  );
});

LoginFormTextField.propTypes = {
  icon: propTypes.element,
};

export default LoginFormTextField;
