const { makeStyles } = require('@material-ui/core');

export const useLoginButtonStyle = makeStyles((theme) => ({
  root: {
    fontFamily: 'Lato',

    height: theme.spacing(6),
    borderRadius: theme.spacing(2),
    width: theme.spacing(33),
    border: '2.021px solid #FFFFFF',
    '&:hover': {
      border: '2.021px solid #FFFFFF',
    },
  },
}));
