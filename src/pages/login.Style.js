import { makeStyles } from '@material-ui/core';

export const useLoginPageStyle = makeStyles((theme) => ({
  logo: {
    width: '125px',
    height: '125px',
    color: '#f4f9fd',
  },
  container: {
    minHeight: '100vh',
    background:
      '-moz-linear-gradient(0% 50% 0deg,rgba(20, 216, 200, 1) 0%,rgba(6, 173, 183, 1) 100%)',
    background:
      '-webkit-linear-gradient(0deg, rgba(20, 216, 200, 1) 0%, rgba(6, 173, 183, 1) 100%)',
    background:
      '-webkit-gradient(linear,0% 50% ,100% 50% ,color-stop(0,rgba(20, 216, 200, 1) ),color-stop(1,rgba(6, 173, 183, 1) ))',
    background:
      '-o-linear-gradient(0deg, rgba(20, 216, 200, 1) 0%, rgba(6, 173, 183, 1) 100%)',
    background:
      '-ms-linear-gradient(0deg, rgba(20, 216, 200, 1) 0%, rgba(6, 173, 183, 1) 100%)',
    '-ms-filter':
      "progid:DXImageTransform.Microsoft.gradient(startColorstr='#14D8C8', endColorstr='#06ADB7' ,GradientType=0)",
    background:
      'linear-gradient(90deg, rgba(20, 216, 200, 1) 0%, rgba(6, 173, 183, 1) 100%)',
  },
}));
