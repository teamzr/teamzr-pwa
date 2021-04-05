import { makeStyles } from '@material-ui/core';

export const useLoginFormTextField = makeStyles((theme) => ({
  helperText: {
    marginTop: '10px',
  },
  textField: {
    border: '2px solid #FFFFFF',
    opacity: '1',
  },
  root: {
    width: '100%',
    borderRadius: theme.spacing(1),
    height: theme.spacing(5),
    color: '#7E7E78',
    opacity: '0.8',
  },
  adorment: {
    //backgroundColor: theme.palette.primary.main,
    background: 'linear-gradient(90deg, #14D8C8 0%, #06ADB7 100%)',

    width: theme.spacing(5),
    height: theme.spacing(5),
    '&>*': {
      color: theme.palette.secondary.main,
    },
  },
}));
