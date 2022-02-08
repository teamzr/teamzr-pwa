import { Avatar, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { AddStepIcon, TeamzrButtonIcon, VerticalDotsIcon } from '../../constants/Icons';
import AccordionComponent from '../AccordionComponent';
import { gql } from '@apollo/client/core';

const USERS_QUERY = gql`
  query conversation($conversationId: ID!) {
    conversation(id: $conversationId) {
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

  const [openAdd, setOpenAdd] = React.useState(false)

  const onAddUserClick = () => {

  }

  return (
    <AccordionComponent summaryTitle={'Coversation Users'}>
      <List component={'nav'}>
        {data?.conversation?.users?.map((u) => (
          <ListItem button>
            <ListItemIcon>
              <Avatar src={u.avatar} />
            </ListItemIcon>
            <ListItemText primary={u.name} />
            <ListItemSecondaryAction >
              <IconButton style={{height: '12px', width: '12px'}} >
                <VerticalDotsIcon style={{ width: '24px', height: '16px' }} />
              </IconButton>
            </ListItemSecondaryAction >
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
  );
}
