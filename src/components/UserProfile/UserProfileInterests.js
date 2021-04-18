import { gql, useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import UserProfileInterestsComponent from './UserProfileInterestsComponent';

const INTERESTS_QUERY = gql`
  {
    interests {
      id
      name
    }
  }
`;

const ME_UDPATE_MUTATION = gql`
  mutation meUpdate($input: ActualUserInput) {
    meUpdate(input: $input) {
      id
      name
      interests {
        id
        name
      }
    }
  }
`;

const ME_ADD_INEREST = gql`
  mutation meAddInterests($name: String) {
    meAddInterest(name: $name) {
      id
      name
    }
  }
`;

function UserProfileInterests(props) {
  const { value, userId, disabled } = props;
  const { data, loading, error } = useQuery(INTERESTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  const [isLoading, setIsLoading] = React.useState(loading);
  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  const [meUpdate] = useMutation(ME_UDPATE_MUTATION);
  const [meAddInterest] = useMutation(ME_ADD_INEREST);

  const onChange = async (values) => {
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

    meUpdate({
      variables: {
        input: {
          id: userId,
          interests: interests.filter((i) => i != null),
        },
      },
    });
    setIsLoading(false);
  };

  return (
    <UserProfileInterestsComponent
      options={data?.interests}
      onChange={onChange}
      value={value}
      loading={isLoading}
      disabled={disabled}
    />
  );
}

export default UserProfileInterests;
