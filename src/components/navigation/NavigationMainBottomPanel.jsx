import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, IconButton, makeStyles } from '@material-ui/core';

import {
  CompassIcon,
  TeamzrButtonIcon,
  MessagesIcon,
} from '../../constants/Icons';

function NavigationMainBottomPanel(props) {
  const classes = useMavigationMainBottomPanelStyle();

  return (
    <>
      <Grid
        container
        direction={'row'}
        justify={'center'}
        alignItems={'center'}
        alignContent={'center'}
        className={classes.container}
      >
        <Grid item xs={3} md={2} className={classes.item}>
          <IconButton>
            <CompassIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3} md={2} className={classes.item}>
          <IconButton>
            <TeamzrButtonIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3} md={2} className={classes.item}>
          <IconButton>
            <MessagesIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

NavigationMainBottomPanel.propTypes = {};

const useMavigationMainBottomPanelStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    textAlign: 'center',
  },
}));

export default NavigationMainBottomPanel;
