import * as React from 'react';
import propTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import NewCampaignDetailsStepComponent from './NewCampaignDetailsStepComponent';
import NewCampaignStartDateStepComponent from './NewCampaignStartDateStepComponent';

export const NEW_CAMPAING_STEPS = {
  DETAILS: 'DETAILS',
  START_DATE: 'START_DATE',
  STEP_DURATION: 'STEP_DURATION',
  REWARD: 'REWARD',
};

const stepComponentMap = {
  [NEW_CAMPAING_STEPS.DETAILS]: NewCampaignDetailsStepComponent,
  [NEW_CAMPAING_STEPS.START_DATE]: NewCampaignStartDateStepComponent,
  [NEW_CAMPAING_STEPS.STEP_DURATION]: '',
  [NEW_CAMPAING_STEPS.REWARD]: '',
};

function NewCampaignComponent(props) {
  const [step, setStep] = React.useState(NEW_CAMPAING_STEPS.START_DATE);
  const [data, setData] = React.useState({
    name: '',
    description: '',
    startDate: null,
  });

  const onDataChange = React.useCallback(
    (name, value) => {
      setData(Object.assign({}, data, { [name]: value }));
    },
    [data]
  );

  const Step = stepComponentMap[step];
  return (
    <Grid container direction={'row'} justify={'center'}>
      <Grid item></Grid>
      <Grid item>
        <Step setStep={setStep} data={data} onDataChange={onDataChange} />
      </Grid>
    </Grid>
  );
}

NewCampaignComponent.propTypes = {
  conversationId: propTypes.string,
};

export default NewCampaignComponent;
