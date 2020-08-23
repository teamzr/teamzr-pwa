import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { ImagesIcon } from '../../constants/Icons';

function MessagesInputBarImagesButtonComponent(props) {
  return (
    <IconButton>
      <ImagesIcon />
    </IconButton>
  );
}

export default MessagesInputBarImagesButtonComponent;
