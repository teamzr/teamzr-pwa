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
import MenuIcon from '@material-ui/icons/Menu';
import useAuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search';

const useAppBarComponentStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    position: 'relative',

    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  avatarMenu: {
    position: 'absolute',
    top: '24px',
  },
}));

function AppBarComponent() {
  const classes = useAppBarComponentStyle();
  const authContext = useAuthContext();

  const [avatarMenuEl, setAvatarMenuEl] = React.useState(null);
  const onAvatarClick = React.useCallback(
    (event) => {
      const target = event.target;

      setAvatarMenuEl(target);
    },
    [setAvatarMenuEl]
  );

  const router = useRouter();

  const handleMyProfile = React.useCallback(() => {
    router.push(`/users/[userName]`, `/users/${authContext.user.id}`);
  });

  const handleSignOut = React.useCallback(() => {
    authContext.logout();
  }, [authContext]);

  const onCloseAvatarMenu = React.useCallback(() => {
    setAvatarMenuEl(null);
  }, [setAvatarMenuEl]);

  return (
    <div className={classes.root}>
      <AppBar position={'static'}>
        <Toolbar>
          <div className={classes.avatar}>
            <IconButton
              aria-controls="avatar-menu"
              aria-haspopup="true"
              onClick={onAvatarClick}
            >
              <Avatar sizes={'sm'} />
            </IconButton>

            <Menu
              id={'avatar-menu'}
              anchorEl={avatarMenuEl}
              open={!!avatarMenuEl}
              onClose={onCloseAvatarMenu}
              className={classes.avatarMenu}
            >
              <MenuItem onClick={handleMyProfile}>My profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </div>
          <Typography>{authContext.user && authContext.user.name}</Typography>
          <div>
            <IconButton>
              <SearchIcon color={'secondary'} />
            </IconButton>
          </div>
          <div className={classes.menuButton}>
            <IconButton color={'secondary'}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppBarComponent;
