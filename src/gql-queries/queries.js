import { gql } from 'apollo-boost';

export const INTERESTS_QUERY = gql`
  {
    interests {
      id
      name
    }
  }
`;

export const PLAN_QUERY = gql`
  query plan($planId: ID!) {
    plan(id: $planId) {
      id
      name
      description
      startDate
      author {
        id
        name
      }
      conversation {
        id
        name
      }
      interests {
        id
        name
      }
      stepDuration
    }
  }
`;
