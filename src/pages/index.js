import * as React from 'react';
import { Container, Box, Button } from '@material-ui/core';

import DefautltLayout from '../pagesLayouts/DefaultLayout';
import useAuthContext from '../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import { protectRoute } from '../utils/ProtectRoute';
import Start from './start';
import ExploreUsersComponent from '../components/ExploreUsersCarousel/ExploreUsersComponent';

const ME_QUERY = gql`
  {
    me {
      id
      name
    }

    communityUsers {
      id
      name
      interests {
        id
        name
      }
      email
    }
  }
`;

function HomePage() {
  const authContext = useAuthContext();
  const { loading, error, data } = useQuery(ME_QUERY);

  const handleLogout = React.useCallback(() => {
    authContext.logout();
  });
  if (loading) {
    return '...Loading';
  }
  return (
    <DefautltLayout>
      <ExploreUsersComponent data={data.communityUsers} />
    </DefautltLayout>
  );
}
const Page = protectRoute(HomePage, Start);
export default Page;
