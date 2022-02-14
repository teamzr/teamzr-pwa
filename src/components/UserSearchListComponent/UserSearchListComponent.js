import * as React from 'react';
import SearchBarComponent from '../SearchBarComponent';
import Skeleton from '@material-ui/lab/Skeleton';

import {
  Avatar,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

function UserSearchListComponent({ users, loading, onUserItemClick }) {
  const handleItemClick = (userId) => {
    onUserItemClick(userId);
  };
  return (
    <Box>
      <Box>
        <SearchBarComponent />
      </Box>
      <Box
        style={{
          height: 'calc(100% - 180px)',
          overflowY: 'scroll',
        }}
      >
        <List>
          {loading && (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          {!loading &&
            users.map((user, i) => (
              <ListItem
                key={i}
                button={true}
                onClick={() => handleItemClick(user.id)}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <ListItemText id={user.id} primary={user.name} />
                <ListItemSecondaryAction>
                  <Checkbox color={'primary'} checked={user.selected} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
}

export default UserSearchListComponent;
