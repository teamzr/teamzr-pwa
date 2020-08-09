import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: ['Lato', 'Roboto'].join(', '),
  palette: {
    primary: {
      main: '#06ADB7',
      light: '#14D8C8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      dark: '#F1F6F7',
      contrastText: '#06ADB7',
    },
    other: {},
    background: {
      login: 'black',
    },
  },
  shadows: 'none',
});

export default theme;
