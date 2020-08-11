import { makeStyles } from '@material-ui/core';

import { PUBLIC_PAGES_BACKGROUND } from '../constants/Colors';

export const useLoginPageStyle = makeStyles((theme) => ({
  background: { ...PUBLIC_PAGES_BACKGROUND, minHeight: '100vh' },

  container: {
    minHeight: '100vh',
  },
}));
