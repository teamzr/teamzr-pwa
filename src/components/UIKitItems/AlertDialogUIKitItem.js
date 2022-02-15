import { Button } from '@material-ui/core';
import * as React from 'react';
import AlertDialogComponent from '../AlertDialog/AlertDialogComponent';

export default function AlertDialogUIKitItem() {
  return (
    <AlertDialogComponent
      open={true}
      title={'Confirm'}
      text={'Sure?'}
      actionButtons={
        <>
          <Button>No</Button>
          <Button variant={'contained'}>Yes</Button>
        </>
      }
    />
  );
}
