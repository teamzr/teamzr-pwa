import { createMuiTheme } from '@material-ui/core';
import { COLORS } from './Colors';

const theme = createMuiTheme({
  typography: ['Lato', 'Roboto'].join(', '),
  palette: {
    primary: {
      main: '#06ADB7',
      light: '#14D8C8',
      contrastText: COLORS.white,
    },
    secondary: {
      main: COLORS.white,
      dark: '#F1F6F7',
      contrastText: '#06ADB7',
    },
    other: {
      text: {
        primary: '#424242',
      },
    },
    background: {
      default: '#F1F6F7',
      paper: COLORS.white,
      login: 'black',
    },
  },
  shadows: 'none',
  overrides: {
    MuiTextField: {
      root: {
        background: COLORS.white,
      },
    },
    MuiSvgIcon: {
      root: {},
    },
  },
});

export default theme;
