import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import moment from 'moment';

import NewCampaignDetailsStepComponent from './NewPlanDetailsStepComponent';
import NewCampaignStartDateStepComponent from './NewPlanStartDateStepComponent';
import NewCampaignDurationStepComponent from './NewPlanDurationStepComponent';
import NewCampaignRewardStepComponent from './NewPlanRewardStepComponent';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
import BackBtnComponent from '../BackBtnComponent';


// TODO: Remove / refactor

export const NEW_CAMPAING_STEPS = {
  DETAILS: 'DETAILS',
  START_DATE: 'START_DATE',
  STEP_DURATION: 'STEP_DURATION',
  REWARD: 'REWARD',
};

const stepComponentMap = {
  [NEW_CAMPAING_STEPS.DETAILS]: NewCampaignDetailsStepComponent,
  [NEW_CAMPAING_STEPS.START_DATE]: NewCampaignStartDateStepComponent,
  [NEW_CAMPAING_STEPS.STEP_DURATION]: NewCampaignDurationStepComponent,
  [NEW_CAMPAING_STEPS.REWARD]: NewCampaignRewardStepComponent,
};
