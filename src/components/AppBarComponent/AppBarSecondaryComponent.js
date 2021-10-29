import * as React from 'react';
import propTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import { Box, Grid, IconButton, Typography, useTheme } from '@material-ui/core';
import useAuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import BackBtnComponent from '../BackBtnComponent';
import { ArrowBack } from '@material-ui/icons';

function AppBarSecondaryComponent(props) {
  const { title, end, onBackClick } = props;
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        alignContent={'stretch'}
      >
        <Grid item xs={2}>
          <IconButton onClick={onBackClick}>
            <ArrowBack
              color={theme.palette.secondary.main}
              htmlColor={theme.palette.secondary.main}
            />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <Typography align={'center'}>{title}</Typography>
        </Grid>
        <Grid item xs={2}>
          {end}
        </Grid>
      </Grid>
    </>
  );
}

export default AppBarSecondaryComponent;
