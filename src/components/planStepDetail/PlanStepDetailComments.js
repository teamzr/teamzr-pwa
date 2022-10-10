import * as React from 'react';
import CommentsComponent from '../CommentsComponent/CommentsComponent';
import { useMutation, gql, useQuery } from '@apollo/client';

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CommentCreateInput!) {
    createComment(input: $input) {
      id
    }
  }
`;

const COMMENTS_QUERY = gql`
  query comments($typeId: ID!) {
    comments(type: PlanStep, typeId: $typeId) {
      id
      text
      createdAt
      author {
        name
        avatar
      }
    }
  }
`;

export default function PlanStepDetailComments({ planStepId }) {
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION);

  const { loading, data, error, startPolling, stopPolling } = useQuery(
    COMMENTS_QUERY,
    {
      variables: { typeId: planStepId },
      fetchPolicy: 'network-only',
    }
  );

  React.useEffect(() => {
    startPolling(1000);
    return () => stopPolling();
  });

  const onSubmit = async (text) => {
    await createComment({
      variables: { input: { text, type: 'PlanStep', typeId: planStepId } },
    });
  };

  return (
    <>
      <CommentsComponent
        onSubmit={onSubmit}
        loading={loading}
        comments={data?.comments}
      />
    </>
  );
}