import * as React from 'react';
import propTypes from 'prop-types';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import PlanStepsComponentAddStepBtn from './PlanStepsComponentAddStepBtn';
import moment from 'moment';

function PlanStepsComponent(props) {
  const { planId, planSteps } = props;

  return (
    <Grid container direction={'column'} style={{ paddingBottom: '45px' }}>
      {planSteps.map((step, i) => (
        <Grid item>
          <Box key={i}>
            <Typography variant={'subtitle1'}>{step.name}</Typography>
            <Typography variant={'caption'}>{step.description}</Typography>
            <Typography variant={'body2'}>
              {step.startDate ? moment(step.startDate).format() : false}
            </Typography>
          </Box>
          {i !== planSteps.length - 1 && (
            <PlanStepsComponentAddStepBtn parent={step.id} planId={planId} />
          )}
        </Grid>
      ))}
      <Grid item>
        <PlanStepsComponentAddStepBtn planId={planId} />
      </Grid>
    </Grid>
  );
}

PlanStepsComponent.propTypes = {
  planId: propTypes.string,
  planSteps: propTypes.array,
};

export default PlanStepsComponent;
