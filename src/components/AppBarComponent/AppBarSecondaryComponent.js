import * as React from 'react';
import propTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@material-ui/core';
import useAuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import BackBtnComponent from '../BackBtnComponent';
import { ArrowBack } from '@material-ui/icons';

function AppBarSecondaryComponent(props) {
  const { onBackClick } = props;
  const theme = useTheme();

  return (
    <>
      <IconButton onClick={onBackClick}>
        <ArrowBack color={theme.palette.secondary.main} />
      </IconButton>
    </>
  );
}

export default AppBarSecondaryComponent;
