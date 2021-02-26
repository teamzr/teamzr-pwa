import * as React from 'react';
import { Container, Box, Button } from '@material-ui/core';
import Link from 'next/link';

import DefautltLayout from '../pagesLayouts/DefaultLayout';
import useAuthContext from '../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import { protectRoute } from '../utils/ProtectRoute';
import Start from './start';
import DiscoverUsersComponent from '../components/DiscoverUsersCarousel/DiscoverUsersComponent';

const ME_QUERY = gql`
  {
    me {
      id
      name
    }

    communityUsers {
      id
      name
      description
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
  const { user } = authContext;
  const { loading, error, data } = useQuery(ME_QUERY);

  const handleLogout = React.useCallback(() => {
    authContext.logout();
  });
  if (loading) {
    return '...Loading';
  }
  return (
    <DefautltLayout>
      <Button onClick={handleLogout}>Log Out</Button>
      <Link href={`/users/${user.id}`}>My profile</Link>
      <DiscoverUsersComponent data={data.communityUsers} />
    </DefautltLayout>
  );
}
const Page = protectRoute(HomePage, Start);
export default Page;
