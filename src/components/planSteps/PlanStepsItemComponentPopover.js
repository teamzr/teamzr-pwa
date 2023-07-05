import * as React from 'react';
import propTypes from 'prop-types';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popover,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { gql, useApolloClient, useMutation } from '@apollo/client';

import { VerticalDotsIcon } from '../../constants/Icons';
import { PLAN_STEPS_QUERY } from '../plans/PlanComponent';
import { CREATE_PLAN_TASK_MUTATION } from './PlanStepsComponentAddStepBtn';

const DELETE_PLAN_STEP_MUTATION = gql`
  mutation deltePlanStep($id: ID!) {
    deletePlanStep(id: $id) {
      id
    }
  }
`;

function PlanStepsItemComponentPopover(props) {
  const { planStepId, planId, planStep } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const handleEdit = () => {};

  const apolloCLient = useApolloClient();
  const [deletePlanStep] = useMutation(DELETE_PLAN_STEP_MUTATION, {
    update: (cache, { data: { deletePlanStep } }) => {
      const { planSteps } = apolloCLient.readQuery({
        query: PLAN_STEPS_QUERY,
        variables: { planId },
      });

      const deleteIndex = planSteps.findIndex(
        (item) => item.id == deletePlanStep.id
      );

      const newPlanSteps = [...planSteps];
      if (deleteIndex != -1) {
        newPlanSteps.splice(deleteIndex, 1);
      }

      const toWrite = newPlanSteps.map((step, i) => {
        const newStep = { ...step };
        newStep.number = i + 1;
        return newStep;
      });

      apolloCLient.writeQuery({
        query: PLAN_STEPS_QUERY,
        data: { planSteps: toWrite },
        variables: { planId },
      });
    },
  });

  const [createPlanStep] = useMutation(CREATE_PLAN_TASK_MUTATION, {
    update: (cache, { data: { createPlanStep } }) => {
      const { planSteps } = apolloCLient.readQuery({
        query: PLAN_STEPS_QUERY,
        variables: { planId },
      });

      const parentIndex = planSteps.findIndex(
        (item) => item.id == createPlanStep?.parent?.id
      );

      const newPlanSteps = [...planSteps];

      newPlanSteps.splice(parentIndex + 1, 0, createPlanStep);

      const toWrite = newPlanSteps.map((step, i) => {
        const newStep = { ...step };
        newStep.number = i + 1;
        return newStep;
      });

      apolloCLient.writeQuery({
        query: PLAN_STEPS_QUERY,
        data: { planSteps: toWrite },
        variables: { planId },
      });
    },
  });

  const handleRemove = async () => {
    await deletePlanStep({ variables: { id: planStepId } });
    setAnchorEl(null);
  };

  const handleDuplicate = async () => {
    await createPlanStep({
      variables: {
        input: {
          name: planStep.name,
          description: planStep.description,
          duration: planStep.duration,          
          plan: planId,
          tikTokVideoUrl: planStep.tikTokVideoUrl
        },
      },
    });
    setAnchorEl(null);
  };

  const togglePopover = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.target);
    }
  };

  return (
    <>
      <IconButton onClick={togglePopover}>
        <VerticalDotsIcon style={{ width: '24px', height: '16px' }} />
      </IconButton>
      <Popover open={open} onClose={togglePopover} anchorEl={anchorEl}>
        <Paper>
          <List component={'nav'}>
            <ListItem button onClick={handleDuplicate}>
              <ListItemText primary={'Duplicate Step'} />
            </ListItem>
            <ListItem button onClick={handleRemove}>
              <ListItemText primary={'Remove Step'} />
            </ListItem>
          </List>
        </Paper>
      </Popover>
    </>
  );
}

export default PlanStepsItemComponentPopover;
