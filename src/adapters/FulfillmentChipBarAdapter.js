import * as React from 'react';

import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import useAuthContext from '../context/AuthContext';
import FullfilmentChipBarSelect from '../components/planStepDetail/FullfilmentChipBarSelect';

const FULFILLMENT_QUERY = gql`
  query fulfillment($planStepId: ID!) {
    fulfillment(planStepId: $planStepId) {
      id
      value
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
  const { planStepId } = props;

  const { user } = useAuthContext();

  const { loading, error, data, refetch } = useQuery(FULFILLMENT_QUERY, {
    variables: { planStepId },
  });
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
      value={data?.fulfillment?.value}
      onChange={onChange}
    />
  );
}

export default FulfillmentChipBarAdapter;
