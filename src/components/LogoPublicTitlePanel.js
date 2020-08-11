import * as React from 'react';
import propTypes from 'prop-types';
import { Box, Grid, Divider, Typography } from '@material-ui/core';
import { Logo } from '../constants/Icons';
import { useLogoPublicTitlePanelStyle } from './LogoPublicTitlePanel.Style';

const LogoPublicTitlePanel = (props) => {
  const { title } = props;
  const classes = useLogoPublicTitlePanelStyle();
  return (
    <Box minHeight={'100%'}>
      <Grid
        container
        direction={'row'}
        alignContent={'center'}
        alignItems={'center'}
        justify={'center'}
        spacing={2}
      >
        <Grid item xs={4}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            direction={'column'}
            justify={'center'}
            alignItems={'center'}
            alignItems={'center'}
            spacing={1}
          >
            <Grid item xs={12}>
              <Logo className={classes.logo} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
      <Grid container direction={'row'} justify={'center'}>
        <Grid item>
          <Typography
            color={'secondary'}
            variant={'h4'}
            className={classes.title}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogoPublicTitlePanel;
