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

export const UPDATE_PLAN_MUTATION = gql`
  mutation updatePlan($input: PlanUpdateInput!) {
    updatePlan(input: $input) {
      id
      name
      description
      rewardDescription
      startDate
      isReview
      isMentored
      steps {
        id
        name
        description
        startDate
        endDate
        number
        status
        duration
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
        }
        parent {
          id
        }
      }
      interests {
        id
        name
      }
    }
  }
`;
