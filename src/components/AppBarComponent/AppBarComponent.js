import * as React from 'react';
import propTypes from 'prop-types';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import useAuthContext from '../../context/AuthContext';
import AppBarPrimaryComponent from './AppBarPrimaryComponent';
import AppBarSecondaryComponent from './AppBarSecondaryComponent';

const useAppBarComponentStyle = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
  },
}));

const APP_BAR_LEVEL = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

function AppBarComponent(props) {
  const { level, onBackClick } = props;
  const classes = useAppBarComponentStyle();
  const authContext = useAuthContext();

  if (!authContext.isAuthenticated) return false;
  return (
    <div className={classes.root}>
      <AppBar position={'fixed'}>
        <Toolbar>
          {(level == APP_BAR_LEVEL.PRIMARY || level == undefined) && (
            <AppBarPrimaryComponent {...props} />
          )}
          {level == APP_BAR_LEVEL.SECONDARY && (
            <AppBarSecondaryComponent onBackClick={onBackClick} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppBarComponent.propTypes = {
  level: propTypes.oneOf(['primary', 'secondary', undefined]),
};

export default AppBarComponent;
