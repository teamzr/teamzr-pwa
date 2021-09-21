import * as React from 'react';

import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import useAuthContext from '../context/AuthContext';
import FullfilmentChipBarSelect from '../components/planStepDetail/FullfilmentChipBarSelect';
import { PLAN_STEP_STATUSES } from '../components/planSteps/PlanStepsConstants';

const FULFILLMENT_QUERY = gql`
  query fulfillment($planStepId: ID!) {
    fulfillment(planStepId: $planStepId) {
      id      
      value
      planStep {
        id
        status
      }
    }
  }
`;

const SET_FULFILLMENT_QUERY = gql`
  mutation setFulfillment($input: FulfillmentInput!) {
    setFulfillment(input: $input) {
      id
      value
      planStep {
        id
        status
        fulfillments {
          id
          value
          user {
            id
            name
            avatar
          }
        }
      }
    }
  }
`;

function FulfillmentChipBarAdapter(props) {
  const { planStepId, status } = props;

  const { user } = useAuthContext();

  const { loading, error, data, refetch } = useQuery(FULFILLMENT_QUERY, {
    variables: { planStepId },
  });
  
  const disabled = status != PLAN_STEP_STATUSES.CURRENT;
  const apolloClient = useApolloClient();
  const [setFulfillment] = useMutation(SET_FULFILLMENT_QUERY, {
    update: (cache, { data: { setFulfillment } }) => {
      apolloClient.writeQuery({
        query: FULFILLMENT_QUERY,
        data: { fulfillment: setFulfillment },
        variables: { planStepId },
      });
    },
  });

  const onChange = (value) => {
    setFulfillment({ variables: { input: { planStepId, value } } });
  };

  return (
    <FullfilmentChipBarSelect
      disabled={disabled}
      value={data?.fulfillment?.value}
      onChange={onChange}
    />
  );
}

export default FulfillmentChipBarAdapter;
