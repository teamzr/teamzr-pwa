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
import { CREATE_PLAN_MUTATION } from '../../gql-mutations/mutations';

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

function NewPlanComponent(props) {
  const { conversationId } = props;
  const [step, setStep] = React.useState(NEW_CAMPAING_STEPS.DETAILS);
  const [data, setData] = React.useState({
    name: '',
    description: '',
    startDate: null,
    stepDuration: 'WEEK',
    rewardDescription: '',
    conversationId,
  });
  const router = useRouter();

  const [createPlan] = useMutation(CREATE_PLAN_MUTATION);

  const onDataChange = (name, value) => {
    setData(Object.assign({}, data, { [name]: value }));
  };

  const handleCreate = async () => {
    const res = await createPlan({ variables: { input: data } });
    const planId = res.data.createPlan.id;
    router.push(`/plans/[planId]`, `/plans/${planId}`);
  };

  const Step = stepComponentMap[step];
  return (
    <Grid container direction={'row'} justify={'center'} spacing={1}>
      <Grid item>
        <BackBtnComponent />
      </Grid>
      <Grid item>
        <Step setStep={setStep} data={data} onDataChange={onDataChange} />
        <Grid item>
          {step == NEW_CAMPAING_STEPS.REWARD && (
            <Button fullWidth variant={'outlined'} onClick={handleCreate}>
              Start off!
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

NewPlanComponent.propTypes = {
  conversationId: propTypes.string,
};

export default NewPlanComponent;
