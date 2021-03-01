import * as React from 'react';
import propTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import useAuthContext from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { MessageIcon } from '../../constants/Icons';

const CREATE_CONVERSATION = gql`
  mutation createConversation($input: ConversationCreateInput!) {
    createConversation(input: $input) {
      id
    }
  }
`;

function UserSendMessageButton(props) {
  const { userId } = props;

  const me = useAuthContext().user;

  const [createConversation] = useMutation(CREATE_CONVERSATION);
  const router = useRouter();

  const handleClick = async () => {
    const { data } = await createConversation({
      variables: {
        input: {
          users: [userId],
        },
      },
    });

    router.push(
      '/messages/[conversationId]',
      `/messages/${data.createConversation.id}`
    );
  };

  return (
    <Button
      variant={'contained'}
      color={'primary'}
      onClick={handleClick}
      startIcon={<MessageIcon />}
    >
      Message
    </Button>
  );
}

export default UserSendMessageButton;
