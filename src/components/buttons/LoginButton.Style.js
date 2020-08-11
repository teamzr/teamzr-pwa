const { makeStyles } = require('@material-ui/core');

export const useLoginButtonStyle = makeStyles((theme) => ({
  root: {
    fontFamily: 'Lato',
    fontSize: theme.spacing(2),
    textTransform: 'none',
    width: '100%',
    height: theme.spacing(6),
    borderRadius: theme.spacing(1),

    border: '2.021px solid #FFFFFF',
    '&:hover': {
      border: '2.021px solid #FFFFFF',
    },
  },
}));
