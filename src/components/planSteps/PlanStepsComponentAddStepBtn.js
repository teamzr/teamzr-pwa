import * as React from 'react';
import propTypes from 'prop-types';
import { AddStepIcon } from '../../constants/Icons';
import { IconButton, ListItem } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useApolloClient, useMutation } from '@apollo/client';
import { PLAN_STEPS_QUERY } from '../planSteps/PlanStepsComponent';

const CREATE_PLAN_TASK_MUTATION = gql`
  mutation createPlanStep($input: PlanStepCreateInput!) {
    createPlanStep(input: $input) {
      id
      name
      description
      number
      plan {
        id
        name
        description
      }
      parent {
        id
      }
    }
  }
`;

function PlanStepsComponentAddStepBtn(props) {
  const { parentId, planId } = props;

  const [inputState, setInputState] = React.useState({
    name: 'New Step',
    description: 'New Step',
  });
  const apolloCLient = useApolloClient();
  const [createPlanStep] = useMutation(CREATE_PLAN_TASK_MUTATION, {
    update: (cache, { data: { createPlanStep } }) => {
      const { planSteps } = cache.readQuery({
        query: PLAN_STEPS_QUERY,
        variables: { planId },
      });

      const parentIndex = planSteps.findIndex(
        (item) => item.id == createPlanStep.parent.id
      );

      const newPlanSteps = [...planSteps];
      newPlanSteps.splice(parentIndex + 1, 0, createPlanStep);

      apolloCLient.writeQuery({
        query: PLAN_STEPS_QUERY,
        data: { planSteps: newPlanSteps },
        variables: { planId },
      });
    },
  });

  const handleCreate = React.useCallback(async () => {
    await createPlanStep({
      variables: {
        input: {
          ...inputState,
          parent: parentId,
          plan: planId,
        },
      },
    });
  }, [planId, parentId, inputState, createPlanStep]);

  return (
    <ListItem alignItems={'center'}>
      <ListItem>
        <IconButton onClick={handleCreate}>
          <AddStepIcon />
        </IconButton>
      </ListItem>
    </ListItem>
  );
}

export default PlanStepsComponentAddStepBtn;
