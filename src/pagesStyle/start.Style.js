import { makeStyles } from '@material-ui/core';
import { PUBLIC_PAGES_BACKGROUND } from '../constants/Colors';

export const useStartPageStyle = makeStyles((theme) => ({
  logoContainer: {
    marginBottom: theme.spacing(12),
  },
  logo: {
    width: theme.spacing(27),
    height: theme.spacing(20),
    color: '#f4f9fd',
  },
  container: {
    minHeight: '100vh',
  },
  background: {
    ...PUBLIC_PAGES_BACKGROUND,
  },
}));
