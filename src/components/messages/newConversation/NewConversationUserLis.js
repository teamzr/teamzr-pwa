import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Grid,
  Typography,
  Button,
  TextField,
  Box,
} from '@material-ui/core';
import { Group, PersonAdd } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';

const COMMUNITY_USER_QUERY = gql`
  {
    communityUsers {
      id
      name
      avatar
      description
      interests {
        id
        name
      }
      email
    }
  }
`;

function NewConversationUserList({
  users,
  setUsers,
  handleCreateConversation,
  name,
  setName,
  isCreatingGroup,
  setIsCreatingGroup,
}) {
  const { loading, data, error } = useQuery(COMMUNITY_USER_QUERY);

  const handleUserClick = (event) => {
    const userId = event.currentTarget.dataset.user;
    if (isCreatingGroup) {
      const newUsers = users?.includes(userId)
        ? users.filter((val) => val != userId)
        : [...users, userId];
      setUsers(newUsers);
    }

    if (!isCreatingGroup) {
      handleCreateConversation(name, [userId]);
    }
  };

  if (loading) return '...';

  const toggleIsCreatingGroup = () => {
    setIsCreatingGroup(!isCreatingGroup);
  };

  const onNameChange = (event, val) => {
    setName(event.target.value);
  };

  return (
    <Grid container direction={'column'}>
      <Grid item md={3} sm={0}></Grid>
      <Grid item md={6} sm={12}>
        {!isCreatingGroup && (
          <Button
            onClick={toggleIsCreatingGroup}
            variant={isCreatingGroup ? 'contained' : 'outlined'}
            color={'primary'}
            fullWidth={true}
            startIcon={
              <Avatar color={'primary'}>
                <Group />
              </Avatar>
            }
            size={'large'}
          >
            New group
          </Button>
        )}
        {isCreatingGroup && (
          <Box margin={'12px'}>
            <TextField
              fullWidth
              value={name}
              label={'Group Name'}
              onChange={onNameChange}
            />
          </Box>
        )}
        <List>
          <ListItem key={'title'}>
            <Typography color={'primary'}>Suggested</Typography>
          </ListItem>
          {data?.communityUsers.map((user) => (
            <ListItem
              key={user.id}
              data-user={user.id}
              button={true}
              onClick={handleUserClick}
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText id={user.id} primary={user.name} />
              {isCreatingGroup && (
                <ListItemSecondaryAction>
                  <PersonAdd
                    onClick={handleUserClick}
                    data-user={user.id}
                    color={users?.includes(user.id) ? 'primary' : 'disabled'}
                  />
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item md={3} sm={0}></Grid>
    </Grid>
  );
}

export default NewConversationUserList;
