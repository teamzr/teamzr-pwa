import { gql } from 'apollo-boost';

export const CONVERSATION_QUERY = gql`
  query Conversation($conversationId: ID!) {
    conversation(id: $conversationId) {
      id
      createdAt
      type
      users {
        avatar
        name
        id
      }
    }
  }
`;
