import * as React from 'react';
import { Container, Box, Button } from '@material-ui/core';
import Link from 'next/link';

import DefautltLayout from '../pagesLayouts/DefaultLayout';
import useAuthContext from '../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import { protectRoute } from '../utils/ProtectRoute';
import Start from './start';
import DiscoverUsersComponent from '../components/DiscoverUsersCarousel/DiscoverUsersComponent';
import AppBarComponent from '../components/AppBarComponent/AppBarComponent';

const ME_QUERY = gql`
  {
    me {
      id
      name
    }

    communityUsers {
      id
      name
      avatar
      description
      interests {
        id
        name
      }
      email
    }
  }
`;

function Explore() {
  const authContext = useAuthContext();
  const { user } = authContext;
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) {
    return '...Loading';
  }
  return (
    <DefautltLayout>
      <DiscoverUsersComponent data={data.communityUsers} />
    </DefautltLayout>
  );
}
const Page = protectRoute(Explore, Start);
export default Page;
