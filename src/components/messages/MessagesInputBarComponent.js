import * as React from 'react';
import propTypes from 'prop-types';
import {
  Box,
  makeStyles,
  Grid,
  TextField,
  IconButton,
} from '@material-ui/core';
import { ImagesIcon } from '../../constants/Icons';
import MessagesInputBarTextFieldComponent from './MesssagesInputBarTextFieldComponent';
import MessagesInputBarSendButtonComponent from './MessagesInputBarSendButtonComponent';
import MessagesInputBarImagesButtonComponent from './MessagesInputBarImagesButtonComponent';
import clsx from 'clsx';

function MessagesInputBarComponent(props) {
  const classes = useMessagesInputBarComponent();
  const [multiline, setMultiline] = React.useState(false);

  const toggleMultiline = React.useCallback(() => {
    setMultiline(!multiline);
  }, [multiline, setMultiline]);
  return (
    <Box className={clsx(classes.container, { [classes.focused]: multiline })}>
      <Grid
        container
        direction={'row'}
        justify={'center'}
        alignItems={'center'}
        alignContent={'center'}
        spacing={1}
      >
        <Grid item xs={1}>
          <Grid container direction={'column'} justify={'flex-start'}>
            <Grid item>
              <MessagesInputBarImagesButtonComponent />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Grid
            container
            direction={'column'}
            justify={'center'}
            alignContent={'center)'}
          >
            <Grid item xs={12}>
              <MessagesInputBarTextFieldComponent
                multiline={multiline}
                onFocus={toggleMultiline}
                onBlur={toggleMultiline}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container direction={'column'} justify={'flex-start'}>
            <Grid item>
              <MessagesInputBarSendButtonComponent />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const useMessagesInputBarComponent = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '55px',
    background: 'linear-gradient(90deg, #14D8C8 0%, #06ADB7 100%)',
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    bottom: 0,
    zIndex: 200,
  },
  focused: {
    height: '80px',
  },
}));

export default MessagesInputBarComponent;
