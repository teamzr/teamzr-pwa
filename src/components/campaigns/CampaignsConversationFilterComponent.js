import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import ConversationFilterButton from './CampaignsConversationFilterButton';
import { set } from 'js-cookie';

function CampaignsConversationFilterComponent(props) {
  const { conversations, conversationId, setConversationId } = props;

  return (
    <Grid container direction={'row'}>
      <Grid item>
        <ConversationFilterButton
          setConversationId={setConversationId}
          active={conversationId == null}
        >
          All
        </ConversationFilterButton>
      </Grid>
      {conversations.map((c, i) => (
        <Grid item key={i}>
          <ConversationFilterButton
            active={conversationId == c.id}
            conversationId={c.id}
            setConversationId={setConversationId}
          >
            {c.name}
          </ConversationFilterButton>
        </Grid>
      ))}
    </Grid>
  );
}

CampaignsConversationFilterComponent.propTypes = {
  conversations: propTypes.array,
  conversationId: propTypes.string,
  setConversationId: propTypes.func,
};

export default CampaignsConversationFilterComponent;
