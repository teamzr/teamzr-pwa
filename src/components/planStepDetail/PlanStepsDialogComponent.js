import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { LeftChevronIcon, VerticalDotsIcon } from '../../constants/Icons';
import PlanStepDetailTabsComponent from './PlanStepDetailTabsComponent';
import PlanStepDetailSettingsTab from './PlanStepDetailSettingsTab';
import PlanStepDetailProgressTab from './PlanStepDetailProgressTab';
import PlanStepDetailOverviewTab from './PlanStepDetailOverview';
import { PLAN_STEP_STATUSES } from '../planSteps/PlanStepsConstants';
import CommentsComponent from '../CommentsComponent/CommentsComponent';

const GET_PLANSTEP_QUERY = gql`
  query planStep($id: ID!) {
    planStep(id: $id) {
      id
      name
      description
      status
      number
      duration
      startDate
      endDate
    }
  }
`;

const PlanStepsDialogComponent = (props) => {
  const { planStepId, handleClose } = props;

  const {
    loading,
    error,
    data: stepData,
  } = useQuery(GET_PLANSTEP_QUERY, {
    variables: {
      id: planStepId,
    },
  });

  const onChangeTab = (event, value) => {
    setTab(value);
  };
  let tabNo = 0;
  const [tab, setTab] = React.useState(tabNo);
  switch (stepData?.planStep?.status) {
    case PLAN_STEP_STATUSES.CURRENT:
      tabNo = 1;
      break;
    case PLAN_STEP_STATUSES.COMPLETED:
      tabNo = 2;
      break;
  }
  React.useEffect(() => {
    setTab(tabNo);
  }, [loading]);

  if (loading) return '...';
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={!!planStepId}
      scroll={'body'}
      fullWidth={true}
      fullScreen={true}
    >
      <Grid
        container
        direction={'row'}
        justify={'space-between'}
        alignItems={'center'}
        alignContent={'center'}
      >
        <Grid item xs={1}>
          <IconButton onClick={handleClose}>
            <LeftChevronIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <Typography variant={'h6'} color={'primary'} align={'center'}>
            {`#${stepData.planStep.number} ${stepData.planStep.name}`}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton>
            <VerticalDotsIcon />
          </IconButton>
        </Grid>
      </Grid>

      <DialogContent>
        <Grid container justify={'center'} spacing={2}>
          <Grid item xs={12}>
            <PlanStepDetailTabsComponent tab={tab} onChange={onChangeTab} />
          </Grid>
          <Grid item xs={12} md={8}>
            {tab == 0 && (
              <PlanStepDetailSettingsTab
                planStepId={planStepId}
                stepData={stepData}
              />
            )}
            {tab == 1 && (
              <PlanStepDetailProgressTab
                planStepId={planStepId}
                status={stepData?.planStep?.status}
              />
            )}
            {tab == 2 && <PlanStepDetailOverviewTab planStepId={planStepId} />}
          </Grid>
          <Grid item xs={12} md={8}>
            <CommentsComponent />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

PlanStepsDialogComponent.propTypes = {
  stepId: propTypes.string,
  handleClose: propTypes.func,
};
export default PlanStepsDialogComponent;
