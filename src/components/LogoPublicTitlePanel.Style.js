import { makeStyles } from '@material-ui/core';

export const useLogoPublicTitlePanelStyle = makeStyles((theme) => ({
  divider: {
    background: theme.palette.secondary.main,
    height: theme.spacing(1) / 4,
  },
  title: {
    fontFamily: 'Lato',
  },
  logo: {
    width: '100%',
    height: 'auto',

    color: '#f4f9fd',
  },
}));
