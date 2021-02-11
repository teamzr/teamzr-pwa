import { Box, Grid, Link, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';

import propTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import DiscoverUsersCardComponent from './DiscoverUsersCardComponent';

function DiscoverUsersComponent(props) {
  const { data } = props;
  const router = useRouter();

  const handleProfile = React.useCallback(
    (username) => {
      router.push('/users/[username]', `/users/${username}`);
    },
    [router]
  );

  const usersCards = [...data];

  return (
    <Grid
      container
      direction={'column'}
      style={{
        maxWidth: '100vw',
        overflow: 'hidden',
      }}
      spacing={1}
    >
      <Grid item xs={12}>
        <Grid container direction={'row'} justify={'space-between'}>
          <Grid item>
            <Typography variant={'h6'}>Discover users</Typography>
          </Grid>
          <Grid item>
            <Link>
              <Typography variant={'h6'}>Browse</Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <Box display={'inline'} display={'inline-flex'} width={'max-content'}>
          <Grid container direction={'row'} spacing={1}>
            {usersCards.map((user, i) => (
              <Grid
                key={i}
                item
                component={'div'}
                style={{ padding: 15, minHeight: 200 }}
              >
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleProfile(user.id)}
                >
                  <DiscoverUsersCardComponent name={user.name} />
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

DiscoverUsersComponent.propTypes = {
  data: propTypes.arrayOf(propTypes.object),
};

export default DiscoverUsersComponent;
