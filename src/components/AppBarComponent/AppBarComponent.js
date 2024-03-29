import * as React from 'react';
import propTypes from 'prop-types';
import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import useAuthContext from '../../context/AuthContext';
import AppBarPrimaryComponent from './AppBarPrimaryComponent';
import AppBarSecondaryComponent from './AppBarSecondaryComponent';
import { useRouter } from 'next/router';

const useAppBarComponentStyle = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(8),
  },
}));

export const APP_BAR_LEVEL = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

function AppBarComponent(props) {
  const { level, title, end, onBackClick } = props;

  const router = useRouter();
  const classes = useAppBarComponentStyle();
  const authContext = useAuthContext();

  const handleOnbackClick = () => {
    if (!onBackClick) {
      router.back();
    }
    if (onBackClick) {
      onBackClick();
    }
  };

  if (!authContext.isAuthenticated) return false;
  return (
    <div className={classes.root}>
      <AppBar position={'fixed'}>
        <Toolbar>
          {(level == APP_BAR_LEVEL.PRIMARY || level == undefined) && (
            <AppBarPrimaryComponent {...props} />
          )}
          {level == APP_BAR_LEVEL.SECONDARY && (
            <AppBarSecondaryComponent
              title={title}
              end={end}
              onBackClick={handleOnbackClick}
            />
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
