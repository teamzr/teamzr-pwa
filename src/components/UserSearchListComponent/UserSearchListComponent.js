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

  const handleOnUserItemClick = (id) => {
    onUserItemClick(id);
  };

  const [usersValue, setUsersValue] = React.useState(users);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    setUsersValue(
      users.filter((user) =>
        user?.name?.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
  }, [users]);

  const onChange = (event) => {
    const val = event.target.value;
    setSearchValue(val);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().startsWith(val.toLowerCase())
    );
    setUsersValue(filtered);
  };
  return (
    <Box>
      <Box>
        <SearchBarComponent onChange={onChange} />
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
            usersValue.map((user, i) => (
              <ListItem
                key={i}
                button={true}
                onClick={() => handleOnUserItemClick(user.id)}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <ListItemText id={user.id} primary={user.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    color={'primary'}
                    checked={user.selected}
                    onClick={() => handleItemClick(user.id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
}

export default UserSearchListComponent;
