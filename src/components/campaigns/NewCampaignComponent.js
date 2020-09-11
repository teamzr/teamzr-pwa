import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import moment from 'moment';

import NewCampaignDetailsStepComponent from './NewCampaignDetailsStepComponent';
import NewCampaignStartDateStepComponent from './NewCampaignStartDateStepComponent';
import NewCampaignDurationStepComponent from './NewCampaignDurationStepComponent';
import NewCampaignRewardStepComponent from './NewCampaignRewardStepComponent';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';

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

const CREATE_CAMPAIGN_MUTATION = gql`
  mutation createCampaign($input: CreateCampaignInputType!) {
    createCampaign(input: $input) {
      id
      name
      description
    }
  }
`;

function NewCampaignComponent(props) {
  const { conversationId } = props;
  const [step, setStep] = React.useState(NEW_CAMPAING_STEPS.DETAILS);
  const [data, setData] = React.useState({
    name: '',
    description: '',
    startDate: moment().format(),
    stepDuration: '14',
    rewardDescription: '',
    conversationId,
  });
  const router = useRouter();

  const [createCampaign] = useMutation(CREATE_CAMPAIGN_MUTATION);

  const onDataChange = React.useCallback(
    (name, value) => {
      setData(Object.assign({}, data, { [name]: value }));
    },
    [data]
  );

  const handleCreate = React.useCallback(async () => {
    const res = await createCampaign({ variables: { input: data } });
    const campaignId = res.data.createCampaign.id;
    router.push(`/campaigns/[campaignId]`, `/campaigns/${campaignId}`);
  }, [data, createCampaign]);

  const Step = stepComponentMap[step];
  return (
    <Grid container direction={'row'} justify={'center'} spacing={1}>
      <Grid item></Grid>
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

NewCampaignComponent.propTypes = {
  conversationId: propTypes.string,
};

export default NewCampaignComponent;
