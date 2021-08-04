import * as React from 'react';
import propTypes from 'prop-types';
import { Avatar, Chip, Grid, Tooltip } from '@material-ui/core';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { AvatarGroup, Skeleton } from '@material-ui/lab';
import { COLORS } from '../../constants/Colors';

const OVERVIEW_PLANSTEP_QUERY = gql`
  query planStep($id: ID!) {
    planStep(id: $id) {
      id
      fulfillments {
        id
        value
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;

function PlanStepDetailOverviewTab(props) {
  const { planStepId } = props;

  const { loading, error, data } = useQuery(OVERVIEW_PLANSTEP_QUERY, {
    variables: { id: planStepId },
    fetchPolicy: 'network-only',
  });

  return (
    <Grid
      container
      direction={'column'}
      alignContent={'left'}
      style={{ margin: '10px 0 0 0' }}
      spacing={3}
    >
      <Grid item>
        <Grid spacing={1} container direction={'row'} alignItems={'center'}>
          <Grid item>
            <Chip
              style={{
                width: 100,
                background: COLORS.planStepSuceeded,
              }}
              color={'primary'}
              variant={'default'}
              label={'Succeded'}
            />
          </Grid>
          <Grid item>
            <PlanStepOverviewAvatarGroup
              loading={loading}
              data={data}
              progress={'SUCEEDED'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid spacing={1} container direction={'row'} alignItems={'center'}>
          <Grid item>
            <Chip
              color={'primary'}
              variant={'default'}
              label={'Failed'}
              color={'primary'}
              style={{
                background: COLORS.planStepFailed,
                width: 100,
              }}
            />
          </Grid>
          <Grid item>
            <PlanStepOverviewAvatarGroup
              loading={loading}
              data={data}
              progress={'FAILED'}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid spacing={1} container direction={'row'} alignItems={'center'}>
          <Grid item>
            <Chip
              style={{
                width: 100,
                background: COLORS.planStepNotRated,
              }}
              variant={'default'}
              color={'primary'}
              label={'Not rated'}
            />
          </Grid>
          <Grid item>
            <PlanStepOverviewAvatarGroup
              loading={loading}
              data={data}
              progress={'NOT_RATED'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const PlanStepOverviewAvatarGroup = ({ loading, data, progress }) => {
  const fulfillments = data?.planStep?.fulfillments?.filter(
    (f) => f?.value == progress
  );

  return (
    <>
      {loading && (
        <AvatarGroup max={2}>
          <Skeleton variant={'circle'} width={40} height={40}></Skeleton>
          <Skeleton variant={'circle'} width={40} height={40}></Skeleton>
          <Skeleton variant={'circle'} width={40} height={40}></Skeleton>
        </AvatarGroup>
      )}
      {!loading && (
        <AvatarGroup max={4}>
          {!loading &&
            fulfillments?.map((f, key) => (
              <Tooltip key={key} title={f?.user?.name}>
                <Avatar alt={f?.user?.name} src={f?.user?.avatar} />
              </Tooltip>
            ))}
        </AvatarGroup>
      )}
    </>
  );
};

export default PlanStepDetailOverviewTab;
