import * as React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PlanStepItemComponentIcon from './PlanStepsItemComponentIcon';
import PlanStepsItemDragIconComponent from './PlanStepsItemDragIconComponent';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
import PlanStepsItemComponentPopover from './PlanStepsItemComponentPopover';

const UPDATE_PLAN_STEP_MUTATION = gql`
  mutation updatePlanStep($input: PlanStepUpdateInput!) {
    updatePlanStep(input: $input) {
      id
      name
      description
    }
  }
`;

function PlanStepsItemComponent(props) {
  const {
    planId,
    planStepId,
    name,
    description,
    startDate,
    number,
    status,
  } = props;
  const classes = usePlanStepsItemComponent();

  const [updatePlanStep] = useMutation(UPDATE_PLAN_STEP_MUTATION);

  const handleUpdate = React.useCallback(
    (event) => {
      const target = event.target;
      const name = target.getElementsByClassName('MuiListItemText-primary')[0]
        .innerText;
      const description = target.getElementsByClassName(
        'MuiListItemText-secondary'
      )[0].innerText;

      updatePlanStep({
        variables: { input: { id: planStepId, name, description } },
      });
    },
    [planStepId, updatePlanStep]
  );

  return (
    <>
      <ListItem>
        <PlanStepsItemDragIconComponent />
        <ListItemIcon>
          <PlanStepItemComponentIcon status={status} number={number} />
        </ListItemIcon>
        <ListItemText
          className={classes.itemTest}
          primary={name}
          secondary={description}
          contentEditable={true}
          onBlur={handleUpdate}
        />
        <ListItemText
          className={classes.date}
          secondary={startDate && moment(startDate).format('DD.mm.yyyy')}
        />
        <ListItemIcon>
          <PlanStepsItemComponentPopover
            planId={planId}
            planStepId={planStepId}
            number={number}
          />
        </ListItemIcon>
      </ListItem>
    </>
  );
}

PlanStepsItemComponent.propTypes = {
  name: propTypes.string,
  description: propTypes.string,
  startDate: propTypes.number,
};

const usePlanStepsItemComponent = makeStyles((theme) => ({
  itemTest: {
    marginLeft: theme.spacing(2),
  },

  date: {},
}));

export default PlanStepsItemComponent;
