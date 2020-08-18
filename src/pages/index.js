import * as React from 'react';
import { Container, Box, Button } from '@material-ui/core';

import DefautltLayout from '../pagesLayouts/DefaultLayout';
import useAuthContext from '../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import { protectRoute } from '../utils/ProtectRoute';
import Start from './start';

const ME_QUERY = gql`
  {
    me {
      id
      name
    }
  }
`;

function HomePage() {
  const authContext = useAuthContext();
  const { loading, error, data } = useQuery(ME_QUERY);

  const handleLogout = React.useCallback(() => {
    authContext.logout();
  });
  return (
    <DefautltLayout>
      <Box>
        {!loading && (
          <>
            <p>{data.me.id}</p>
            <p>{data.me.name}</p>
          </>
        )}
      </Box>
      <Button onClick={handleLogout}>Log out</Button>
    </DefautltLayout>
  );
}
const Page = protectRoute(HomePage, Start);
export default Page;
