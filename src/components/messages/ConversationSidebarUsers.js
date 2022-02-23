import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import * as React from 'react';
import { useQuery } from '@apollo/client';
import {
  AddStepIcon,
  TeamzrButtonIcon,
  VerticalDotsIcon,
} from '../../constants/Icons';
import AccordionComponent from '../AccordionComponent';
import { gql } from '@apollo/client/core';
import ConversationAddUsersDialog from './ConversationAddUsersDialog';
import AlertDialogComponent from '../AlertDialog/AlertDialogComponent';

const USERS_QUERY = gql`
  query conversation($conversationId: ID!) {
    conversation(id: $conversationId) {
      id
      type
      users {
        id
        name
        avatar
      }
    }
  }
`;

export default function CoversationSidebarUsers({ conversationId }) {
  const { loading, error, data } = useQuery(USERS_QUERY, {
    variables: {
      conversationId,
    },
  });

  const [openAdd, setOpenAdd] = React.useState(false);

  const onAddUserClick = () => {
    setOpenAdd(!openAdd);
  };

  const onCancelClick = () => {
    setOpenAdd(false);
  };
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);
  const handleUserRemove = () => {
    setRemoveDialogOpen(!removeDialogOpen);
  };

  if (data?.conversation?.type == 'DIRECT') {
    return false;
  }
  return (
    <>
      <AccordionComponent summaryTitle={'Users'}>
        <List component={'nav'}>
          {data?.conversation?.users?.map((u) => (
            <ListItem button>
              <ListItemIcon>
                <Avatar src={u.avatar} />
              </ListItemIcon>
              <ListItemText primary={u.name} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={handleUserRemove}
                  style={{ width: '12px', height: '12px' }}
                >
                  <VerticalDotsIcon style={{ width: '24px', height: '16px' }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem button onClick={onAddUserClick}>
            <ListItemIcon>
              <AddStepIcon />
            </ListItemIcon>
            <ListItemText primary={'Add user'} />
          </ListItem>
        </List>
      </AccordionComponent>
      <ConversationAddUsersDialog
        open={openAdd}
        conversationId={conversationId}
        onCancelClick={onCancelClick}
      />
      <AlertDialogComponent
        open={removeDialogOpen}
        title={'Remove confirmation'}
        text={'Sure you want to remove this user from conversation?'}
        actionButtons={
          <>
            <Button
              color={'primary'}
              variant={'outlined'}
              onClick={handleUserRemove}
            >
              Cancel
            </Button>
            <Button
              color={'primary'}
              variant={'contained'}
              onClick={handleUserRemove}
            >
              Remove
            </Button>
          </>
        }
      />
    </>
  );
}
