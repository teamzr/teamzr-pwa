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
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import {
  AddStepIcon,
  TeamzrButtonIcon,
  VerticalDotsIcon,
} from '../../constants/Icons';
import AccordionComponent from '../AccordionComponent';
import { gql } from '@apollo/client/core';
import ConversationAddUsersDialog from './ConversationAddUsersDialog';
import AlertDialogComponent from '../AlertDialog/AlertDialogComponent';
import { ConversationSidebarUsersItemActions } from './ConversationSidebarUsersItemActions';

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

const UPDATE_CONVERSATION_MUTATION = gql`
  mutation updateConversation($input: ConversationUpdateInput!) {
    updateConversation(input: $input) {
      id
      name
      users {
        id
        name
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
  const [actionUserId, setActionUserId] = React.useState(0);

  const onAddUserClick = () => {
    setOpenAdd(!openAdd);
  };

  const onCancelClick = () => {
    setOpenAdd(false);
  };
  const [removeDialogOpen, setRemoveDialogOpen] = React.useState(false);

  const handleUserRemoveDialogShow = (id) => {
    setRemoveDialogOpen(true);
    setActionUserId(id);
  };
  const handleUserRemoveCancel = () => {
    setRemoveDialogOpen(!removeDialogOpen);
  };
  const [updateConversation] = useMutation(UPDATE_CONVERSATION_MUTATION);
  const handleUserRemove = () => {
    updateConversation({
      variables: {
        input: {
          id: conversationId,
          users: {
            values: [actionUserId],
            action: 'REMOVE',
          },
        },
      },
    });
    setRemoveDialogOpen(false);
  };
  const router = useRouter();
  const onProfileClick = (id) => {
    router.push('/users/[username]', `/users/${id}`);
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
                <ConversationSidebarUsersItemActions
                  userId={u.id}
                  onRemoveClick={handleUserRemoveDialogShow}
                  onProfileClick={onProfileClick}
                />
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
        setOpen={setOpenAdd}
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
              onClick={handleUserRemoveCancel}
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
