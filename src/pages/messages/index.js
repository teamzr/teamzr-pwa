import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/react-hooks';

import LoadingIndicatorComponent from '../../components/LoadingIndicatorComponent';
import DefaultLayout from '../../pagesLayouts/DefaultLayout';
import MessagesComponent from '../../components/messages/MessagesComponent';
import Messages from './[conversationId]';

const GET_CONVERSATIONS_QUERY = gql`
  {
    conversations {
      id
      name
      readByIds
      updatedAt
      messages {
        id
        text
      }
    }
  }
`;

function MessagesIndex(props) {
  return <Messages />;
}

export default MessagesIndex;
