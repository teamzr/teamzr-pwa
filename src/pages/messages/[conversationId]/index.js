import * as React from 'react';
import propTypes from 'prop-types';
import MessagesComponent from '../../../components/messages/ConversationsComponent';

import DefaultLayout from '../../../pagesLayouts/DefaultLayout';

function Messages(props) {
  return (
    <DefaultLayout>
      <MessagesComponent />
    </DefaultLayout>
  );
}

export default Messages;
