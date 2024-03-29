import * as React from 'react';
import propTypes from 'prop-types';
import {
  Avatar,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { DrawerToggleIcon } from '../../constants/Icons';
import SearchBarComponent from '../SearchBarComponent';

function MyPlansHeaderComponent(props) {
  const classes = useMyPlansHeaderComponentStyle();
  return (
    <>
      <Grid container direction={'column'} spacing={1}>
        <Grid item>
          <Grid
            container
            direction={'row'}
            justify={'space-between'}
            alignItems={'center'}
          >
            <Grid item xs={1}>
              <Grid container justify={'flex-end'}>
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.search}>
            <SearchBarComponent />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const useMyPlansHeaderComponentStyle = makeStyles((theme) => ({
  search: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default MyPlansHeaderComponent;
