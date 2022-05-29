import { gql } from 'apollo-boost';

export const ME_ADD_INTEREST = gql`
  mutation meAddInterests($name: String) {
    meAddInterest(name: $name) {
      id
      name
    }
  }
`;

export const CREATE_PLAN_MUTATION = gql`
  mutation createPlan($input: PlanCreateInput!) {
    createPlan(input: $input) {
      id
      name
      conversation {
        id
        name
        users {
          id
          avatar
        }
      }
    }
  }
`;
