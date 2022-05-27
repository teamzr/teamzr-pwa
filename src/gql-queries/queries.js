import { gql } from 'apollo-boost';

export const INTERESTS_QUERY = gql`
  {
    interests {
      id
      name
    }
  }
`;
