import * as React from 'react';
import { Container, Box, Button } from '@material-ui/core';

import { useLoginPageStyle } from './login.Style';
import useAuthContext from '../context/AuthContext';
import { useQuery, gql } from '@apollo/client';

const ME_QUERY = gql`
  {
    me {
      id
      name
    }
  }
`;

function HomePage() {
  const classes = useLoginPageStyle();
  const authContext = useAuthContext();
  const { loading, error, data } = useQuery(ME_QUERY);

  const handleLogout = React.useCallback(() => {
    authContext.logout();
  });
  return (
    <Container>
      <Box>
        {!loading && (
          <>
            <p>{data.me.id}</p>
            <p>{data.me.name}</p>
          </>
        )}
      </Box>
      <Button onClick={handleLogout}>Log out</Button>
    </Container>
  );
}

export default HomePage;
