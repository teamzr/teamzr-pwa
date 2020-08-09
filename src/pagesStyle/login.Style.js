import { makeStyles } from '@material-ui/core';

import { PUBLIC_PAGES_BACKGROUND } from '../constants/Colors';

export const useLoginPageStyle = makeStyles((theme) => ({
  background: { ...PUBLIC_PAGES_BACKGROUND, minHeight: '100vh' },
  logo: {
    width: theme.spacing(20),
    height: theme.spacing(20),

    color: '#f4f9fd',
  },
  divider: {
    background: theme.palette.secondary.main,
  },
  title: {
    fontFamily: 'Lato',
  },
  container: {},
}));
