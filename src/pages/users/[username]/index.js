import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';

import DefaultLayout from '../../../pagesLayouts/DefaultLayout';
import LoadingIndicatorComponent from '../../../components/LoadingIndicatorComponent';
import { Avatar, Grid, IconButton, Typography } from '@material-ui/core';
import { BackArrowIcon } from '../../../constants/Icons';
import UserProfileComponent from '../../../components/UserProfile/UserProfileComponent';

const USER_QUERY = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      id
      name
      email
    }
  }
`;

function UserPage(props) {
  const router = useRouter();
  const { username } = router.query;

  const handleBack = React.useCallback(() => {
    router.back();
  }, []);

  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: { userId: username },
  });

  if (loading) return <LoadingIndicatorComponent />;
  return (
    <DefaultLayout>
      <Grid container direction={'row'} justify={'center'}>
        <Grid item xs={12} style={{ position: 'static' }}>
          <IconButton onClick={handleBack}>
            <BackArrowIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <UserProfileComponent user={data.user} />
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}

export default UserPage;
