import { gql } from 'apollo-boost';

export const ME_ADD_INTEREST = gql`
  mutation meAddInterests($name: String) {
    meAddInterest(name: $name) {
      id
      name
    }
  }
`;