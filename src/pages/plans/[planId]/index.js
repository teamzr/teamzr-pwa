import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';

import DefaultLayout from '../../../pagesLayouts/DefaultLayout';
import LoadingIndicatorComponent from '../../../components/LoadingIndicatorComponent';
import { Grid, IconButton, Typography } from '@material-ui/core';

import { BackArrowIcon } from '../../../constants/Icons';
import PlanComponent from '../../../components/plans/PlanComponent';

function Campaign(props) {
  const router = useRouter();
  const { planId } = router.query;

  const handleBack = () => {
    router.back();
  };

  if (!planId) return <LoadingIndicatorComponent />;
  return (
    <DefaultLayout>
      <Grid container direction={'row'} justify={'center'}>
        <Grid item xs={12} style={{ position: 'static' }}>
          <IconButton onClick={handleBack}>
            <BackArrowIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <PlanComponent planId={planId} />
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}

export default Campaign;
