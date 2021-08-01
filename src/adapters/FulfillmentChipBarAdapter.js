import * as React from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
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
    }
  }
`;

function FulfillmentChipBarAdapter(props) {
  const { planStepId } = props;

  const { user } = useAuthContext();

  const { loading, error, data, refetch } = useQuery(FULFILLMENT_QUERY, {
    variables: { planStepId },
    fetchPolicy: 'cache-and-network',
  });
  const [setFulfillment] = useMutation(SET_FULFILLMENT_QUERY);

  const onChange = async (value) => {
    await setFulfillment({ variables: { input: { planStepId, value } } });
  };

  if (loading) return '...loading';

  return (
    <FullfilmentChipBarSelect
      value={data?.fulfillment?.value}
      onChange={onChange}
    />
  );
}

export default FulfillmentChipBarAdapter;
