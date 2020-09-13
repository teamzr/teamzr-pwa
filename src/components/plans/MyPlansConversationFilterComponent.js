import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Button, Box } from '@material-ui/core';
import ConversationFilterButton from './MyPlansConversationFilterButton';

function MyPlansConversationFilterComponent(props) {
  const { conversations, conversationId, setConversationId } = props;

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
            {c.name}
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
