import * as React from 'react';
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';

function MyPlansConversationFilterButton(props) {
  const { active, conversationId, setConversationId, children } = props;

  const handleClick = () => {
    setConversationId(conversationId);
  };

  return (
    <Button
      style={{ borderRadius: 16 }}
      disableElevation={true}
      variant={active ? 'contained' : 'text'}
      color={'primary'}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

MyPlansConversationFilterButton.propTypes = {
  active: propTypes.bool,
  conversationId: propTypes.string,
  children: propTypes.any,
  setConversationId: propTypes.func,
};

export default MyPlansConversationFilterButton;
