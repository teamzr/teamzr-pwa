import * as React from 'react';
import propTypes from 'prop-types';
import { AddStepIcon } from '../../constants/Icons';
import { IconButton, ListItem } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useApolloClient, useMutation } from '@apollo/client';
import { PLAN_STEPS_QUERY } from '../plans/PlanComponent';

const CREATE_PLAN_TASK_MUTATION = gql`
  mutation createPlanStep($input: PlanStepCreateInput!) {
    createPlanStep(input: $input) {
      id
      name
      description
      number
      startDate
      endDate
      duration
      status
      fulfillments {
        id
        value
        user {
          id
          avatar
        }
      }
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
    name: '',
    description: '',
  });
  const apolloCLient = useApolloClient();
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

  const handleCreate = async () => {
    await createPlanStep({
      variables: {
        input: {
          ...inputState,
          parent: parentId,
          plan: planId,
        },
      },
    });
  };

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
