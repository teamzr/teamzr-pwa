import * as React from 'react';
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { AddPersonIcon } from '../../constants/Icons';

function UserConnectButton(props) {
  return (
    <Button
      variant={'contained'}
      color={'primary'}
      startIcon={<AddPersonIcon />}
    >
      Follow
    </Button>
  );
}

export default UserConnectButton;
