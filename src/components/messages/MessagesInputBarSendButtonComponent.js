import * as React from 'react';
import propTypey from 'prop-types';
import { IconButton } from '@material-ui/core';
import { SendIcon } from '../../constants/Icons';

function MessagesInputBarSendButtonComponent(props) {
  return (
    <IconButton {...props}>
      <SendIcon />
    </IconButton>
  );
}

export default MessagesInputBarSendButtonComponent;
