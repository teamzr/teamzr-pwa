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
    display: 'flex',
  },
  title: {
    flexGrow: 1,
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
          >
            <MenuItem onClick={handleMyProfile}>My profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
          <Typography variant={'h6'} className={classes.title}>
            {authContext.user && authContext.user.name}
          </Typography>
          <IconButton>
            <SearchIcon color={'secondary'} />
          </IconButton>
          <IconButton color={'secondary'}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppBarComponent;
