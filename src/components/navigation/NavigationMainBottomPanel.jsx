import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, IconButton, makeStyles, Box } from '@material-ui/core';
import { useRouter } from 'next/router';

import {
  CompassIcon,
  TeamzrButtonIcon,
  MessagesIcon,
} from '../../constants/Icons';
import { route } from 'next/dist/next-server/server/router';
import useAuthContext from '../../context/AuthContext';

function NavigationMainBottomPanel(props) {
  const classes = useMavigationMainBottomPanelStyle();
  const router = useRouter();

  const authCtx = useAuthContext();

  const handleExplore = React.useCallback(() => {
    router.push('/explore');
  }, [router]);

  const handleCampaings = React.useCallback(() => {
    router.push('/campaigns');
  }, [router]);

  const handleMessages = React.useCallback(() => {
    router.push('/messages');
  }, [router]);

  if (!authCtx.isAuthenticated) return false;
  return (
    <Box style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
      <Grid
        container
        direction={'row'}
        justify={'center'}
        alignItems={'center'}
        alignContent={'center'}
        className={classes.container}
      >
        <Grid item xs={3} md={2} className={classes.item}>
          <IconButton onClick={handleExplore}>
            <CompassIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3} md={2} className={classes.item}>
          <IconButton onClick={handleCampaings}>
            <TeamzrButtonIcon />
          </IconButton>
        </Grid>
        <Grid item xs={3} md={2} className={classes.item}>
          <IconButton onClick={handleMessages}>
            <MessagesIcon className={classes.item} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

NavigationMainBottomPanel.propTypes = {};

const useMavigationMainBottomPanelStyle = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    textAlign: 'center',
    color: 'transparent',
  },
}));

export default NavigationMainBottomPanel;
