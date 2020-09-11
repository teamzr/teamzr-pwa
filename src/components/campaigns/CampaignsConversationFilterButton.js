import * as React from 'react';
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';

function ConversationFilterButton(props) {
  const { active, conversationId, setConversationId, children } = props;

  const handleClick = React.useCallback(() => {
    setConversationId(conversationId);
  }, [conversationId, setConversationId]);

  return (
    <Button variant={active ? 'contained' : 'outline'} onClick={handleClick}>
      {children}
    </Button>
  );
}

ConversationFilterButton.propTypes = {
  active: propTypes.bool,
  conversationId: propTypes.string,
  children: propTypes.any,
  setConversationId: propTypes.func,
};

export default ConversationFilterButton;
