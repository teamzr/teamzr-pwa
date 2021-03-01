import * as React from 'react';
import propTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import useAuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import AppBarPrimaryComponent from './AppBarPrimaryComponent';

const useAppBarComponentStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: theme.spacing(8),
  },
}));

function AppBarComponent() {
  const classes = useAppBarComponentStyle();
  const authContext = useAuthContext();

  if (!authContext.isAuthenticated) return false;
  return (
    <div className={classes.root}>
      <AppBar position={'fixed'}>
        <Toolbar>
          <AppBarPrimaryComponent />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppBarComponent;
