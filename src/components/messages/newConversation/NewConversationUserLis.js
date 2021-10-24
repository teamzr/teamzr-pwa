import * as React from 'react';
import { useQuery } from '@apollo/client';
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  ListItemSecondaryAction,
  Grid,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { Group } from '@material-ui/icons';
import { gql } from 'apollo-boost';
import { SpeedDial } from '@material-ui/lab';

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

function NewConversationUserList() {
  const { loading, data, error } = useQuery(COMMUNITY_USER_QUERY);

  if (loading) return '...';

  return (
    <Grid container direction={'column'}>
      <Grid item md={3} sm={0}></Grid>
      <Grid item md={6} sm={12}>
        <Button fullWidth={true}>
          <Button
            fullWidth={true}
            startIcon={
              <Avatar>
                <Group />
              </Avatar>
            }
            size={'large'}
          >
            New group
          </Button>
        </Button>

        <List>
          <ListItem key={'title'}>
            <Typography color={'primary'}>Suggested</Typography>
          </ListItem>
          {data?.communityUsers.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText id={user.id} primary={user.name} />
              <ListItemSecondaryAction>
                <Checkbox edge={'end'} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item md={3} sm={0}></Grid>
    </Grid>
  );
}

export default NewConversationUserList;
