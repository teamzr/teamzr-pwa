import { useQuery } from '@apollo/react-hooks';
import { Skeleton } from '@material-ui/lab';
import * as React from 'react';
import { CONVERSATION_QUERY } from '../../gql-queries/conversationQueries';
import UserMultiSelectComponent from '../UserMultiSelectComponent/UserMultiSelectComponent';

export default function PlanSettignsCoversationUsersSelect(props) {
  const { value, onChange, label, conversationId } = props;
  const { data, isLoading, error } = useQuery(CONVERSATION_QUERY, {
    variables: { conversationId: conversationId },
  });

  const options = data?.conversation?.users?.map((v) => ({
    label: v.name,
    value: v.id,
  }));

  return (
    <>
      {isLoading && <Skeleton />}
      {!isLoading && data && (
        <UserMultiSelectComponent
          label={label}
          options={options}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
}
