import * as React from 'react';
import { Grid, Container, Box } from '@material-ui/core';

import { LogoIcon } from '../constants/Icons';
import LoginFormComponent from '../components/LoginForm/LoginFormComponent';
import { useLoginPageStyle } from './login.Style';

function HomePage() {
  const classes = useLoginPageStyle();
  return <Container>Davaj</Container>;
}

export default HomePage;
