import * as React from 'react';
import propTypes from 'prop-types';

import { Grid, Button, Box, Avatar } from '@material-ui/core';
import ConversationFilterButton from './MyPlansConversationFilterButton';
import useAuthContext from '../../context/AuthContext';

function MyPlansConversationFilterComponent(props) {
  const { conversations, conversationId, setConversationId } = props;

  const { user } = useAuthContext();

  return (
    <Box overflow={'scroll'} height={'auto'} paddingBottom={1}>
      <Box display={'inline'} display={'inline-flex'} width={'max-content'}>
        <ConversationFilterButton
          setConversationId={setConversationId}
          active={conversationId == null}
        >
          All
        </ConversationFilterButton>

        {conversations.map((c, i) => (
          <ConversationFilterButton
            key={i}
            active={conversationId == c.id}
            conversationId={c.id}
            setConversationId={setConversationId}
          >
            <Grid
              container
              spacing={1}
              alignItems={'center'}
              alignContent={'center'}
              direction={'row'}
            >
              <Grid item>
                <Avatar src={c.users.find((u) => u.id != user.id).avatar} />
              </Grid>
              <Grid item>{c.name}</Grid>
            </Grid>
          </ConversationFilterButton>
        ))}
      </Box>
    </Box>
  );
}

MyPlansConversationFilterComponent.propTypes = {
  conversations: propTypes.array,
  conversationId: propTypes.string,
  setConversationId: propTypes.func,
};

export default MyPlansConversationFilterComponent;
