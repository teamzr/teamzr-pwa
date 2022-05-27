import { useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import { ME_ADD_INTEREST } from '../../gql-mutations/mutations';
import { INTERESTS_QUERY } from '../../gql-queries/queries';
import UserProfileInterestsComponent from '../UserProfile/UserProfileInterestsComponent';

export default function PlanSettingsFormInterests({
  disabled,
  value,
  onChange,
}) {
  const { data, loading, error } = useQuery(INTERESTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const [meAddInterest] = useMutation(ME_ADD_INTEREST);

  const [isLoading, setIsLoading] = React.useState(loading);
  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleChange = async (values) => {
    setIsLoading(true);
    const newValues = values.filter((i) => i.id == null);
    const interests = values.map((val) => val.id);

    if (newValues.length > 0) {
      for (let i = 0; newValues.length > i; ++i) {
        const newVal = newValues[i];
        const resp = await meAddInterest({
          variables: {
            name: newVal.name,
          },
        });

        interests.push(resp.data.meAddInterest.id);
      }
    }

    onChange(data?.interests.filter((i) => interests.includes(i.id)));
    setIsLoading(false);
  };

  return (
    <UserProfileInterestsComponent
      options={data?.interests}
      onChange={handleChange}
      value={value}
      loading={isLoading}
      disabled={disabled}
    />
  );
}
