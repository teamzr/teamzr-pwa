import * as React from 'react';
import propTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import { Dialog, DialogContent, Grid, IconButton } from '@material-ui/core';
import { LeftChevronIcon, VerticalDotsIcon } from '../../constants/Icons';
import PlanStepDetailTabsComponent from './PlanStepDetailTabsComponent';
import PlanStepDetailSettingsTab from './PlanStepDetailSettingsTab';
import PlanStepDetailProgressTab from './PlanStepDetailProgressTab';
import PlanStepDetailOverviewTab from './PlanStepDetailOverview';

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

  const [tab, setTab] = React.useState(0);

  const { loading, error, data: stepData } = useQuery(GET_PLANSTEP_QUERY, {
    variables: {
      id: planStepId,
    },
  });

  const onChangeTab = (event, value) => {
    setTab(value);
  };

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
        <Grid item xs={1}>
          <IconButton>
            <VerticalDotsIcon />
          </IconButton>
        </Grid>
      </Grid>

      <DialogContent>
        <Grid container justify={'center'}>
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
            {tab == 1 && <PlanStepDetailProgressTab planStepId={planStepId} />}
            {tab == 2 && <PlanStepDetailOverviewTab planStepId={planStepId} />}
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
