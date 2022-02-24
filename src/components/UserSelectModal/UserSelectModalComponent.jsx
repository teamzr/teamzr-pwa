import * as React from 'react';
import propTypes from 'prop-types';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import UserSearchListComponent from '../UserSearchListComponent/UserSearchListComponent';

function UserSelectModalComponent(props) {
  const {
    open,
    users,
    loading,
    onAddUsersClick,
    onCancelClick,
    onUserItemClick,
  } = props;

  return (
    <Dialog scroll={'paper'} open={open} maxWidth={'sm'} fullWidth={true}>
      <DialogTitle>Select Users</DialogTitle>
      <DialogContent>
        <UserSearchListComponent
          loading={loading}
          users={users}
          onUserItemClick={onUserItemClick}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelClick}>Cancel</Button>
        <Button
          color={'primary'}
          variant={'contained'}
          onClick={onAddUsersClick}
        >
          Add users
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UserSelectModalComponent.propTypes = {
  open: propTypes.bool,
};

export default UserSelectModalComponent;
