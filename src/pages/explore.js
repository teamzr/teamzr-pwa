import * as React from 'react';
import { Container, Box, Button } from '@material-ui/core';
import Link from 'next/link';

import DefautltLayout from '../pagesLayouts/DefaultLayout';
import useAuthContext from '../context/AuthContext';
import { useQuery, gql } from '@apollo/client';
import { protectRoute } from '../utils/ProtectRoute';
import Start from './start';
import DiscoverUsersComponent from '../components/DiscoverUsersCarousel/DiscoverUsersComponent';
import UserProfileInterestsComponent from '../components/UserProfile/UserProfileInterestsComponent';
import InterestsFilterComponent from '../components/InterestsFilter/InterestsFilterComponent';
import LoadingIndicatorComponent from '../components/LoadingIndicatorComponent';

const ME_QUERY = gql`
  {
    me {
      id
      name
      interests {
        id
        name
      }
    }
  }
`;

const COMMUNITY_QUERY = gql`
  query($interestId: ID) {
    communityUsers(interestId: $interestId) {
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
  const [interestId, setInterestId] = React.useState(null);
  const { loading: meLoading, error: meError, data: meData } = useQuery(
    ME_QUERY
  );
  const { loading, error, data } = useQuery(COMMUNITY_QUERY, {
    variables: { interestId },
  });

  if (meLoading) {
    return '...Loading';
  }

  return (
    <DefautltLayout>
      <InterestsFilterComponent
        interests={meData.me.interests}
        value={interestId}
        onChange={setInterestId}
      />
      {loading ? (
        <LoadingIndicatorComponent />
      ) : (
        <DiscoverUsersComponent data={data.communityUsers} />
      )}
    </DefautltLayout>
  );
}
const Page = protectRoute(Explore, Start);
export default Page;
