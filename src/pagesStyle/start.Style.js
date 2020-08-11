import { makeStyles } from '@material-ui/core';
import { PUBLIC_PAGES_BACKGROUND } from '../constants/Colors';

export const useStartPageStyle = makeStyles((theme) => ({
  logoContainer: {
    marginBottom: theme.spacing(12),
  },
  logo: {
    width: '100%',
    height: 'auto',
    color: '#f4f9fd',
  },
  container: {
    minHeight: '100vh',
  },
  background: {
    ...PUBLIC_PAGES_BACKGROUND,
  },
  button: {
    borderRadius: theme.spacing(2),
  },
}));
