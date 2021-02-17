import * as React from 'react';

import { MessagesIcon } from '../../constants/Icons';
import { Grid, IconButton, makeStyles, Box, Badge } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import { POOL_INTERVAL_MEDIUM } from '../../constants/NetworkConstants';

const MESSAGES_COUNT_QUERY = gql`
  {
    messagesUnreadCount
  }
`;

function NavigationMainBottomPanelMessagesBtn(props) {
  const { onClick, className } = props;

  const { data, loading, error } = useQuery(MESSAGES_COUNT_QUERY, {
    pollInterval: POOL_INTERVAL_MEDIUM,
  });
  return (
    <IconButton onClick={onClick}>
      <Badge
        badgeContent={!loading && data.messagesUnreadCount}
        color={'error'}
      >
        <MessagesIcon className={className} />
      </Badge>
    </IconButton>
  );
}

export default NavigationMainBottomPanelMessagesBtn;
