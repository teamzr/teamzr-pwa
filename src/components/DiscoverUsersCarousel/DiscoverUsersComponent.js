import { Box, Grid, Typography } from '@material-ui/core';

import propTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import DiscoverUsersCardComponent from './DiscoverUsersCardComponent';

function DiscoverUsersComponent(props) {
  const { data } = props;
  // TODO: https://www.figma.com/file/gSax4ny49qzOkRQG7IbHIN/Draft-Honza-Sovi%C5%A1?node-id=318%3A54
  return (
    <Grid container direction={'column'}>
      <Grid item xs={12}>
        <Typography>Discover users</Typography>
        <Typography>Browse</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          maxWidth: '100vw',
          overflow: 'hidden',
        }}
      >
        <Box display={'inline'} display={'inline-flex'} width={'max-content'}>
          <Grid container direction={'row'} spacing={1}>
            <SwipeableViews
              enableMouseEvents
              style={{ padding: '0 30px' }}
              slideStyle={{ padding: '0 10px' }}
            >
              {data.map((user, i) => (
                <Grid
                  item
                  component={'div'}
                  style={{ padding: 15, minHeight: 100 }}
                >
                  <DiscoverUsersCardComponent key={i} name={user.name} />
                </Grid>
              ))}
            </SwipeableViews>
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
