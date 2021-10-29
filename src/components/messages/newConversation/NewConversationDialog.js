import { useMutation } from '@apollo/client';
import { Button, Dialog, Slide } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import * as React from 'react';
import AppBarComponent from '../../AppBarComponent/AppBarComponent';
import NewConversationUserList from './NewConversationUserLis';

const CREATE_CONVERSATION = gql`
  mutation createConversation($input: ConversationCreateInput!) {
    createConversation(input: $input) {
      id
    }
  }
`;

function NewConversationDialog(props) {
  const { open, onClose } = props;

  const [users, setUsers] = React.useState([]);
  const [name, setName] = React.useState('');

  const [createConversation] = useMutation(CREATE_CONVERSATION);
  const router = useRouter();

  const handleCreateConversation = async (name, users) => {
    const { data } = await createConversation({
      variables: {
        input: {
          name: name ? name : undefined,
          users: users,
        },
      },
    });

    router.push(
      '/messages/[conversationId]',
      `/messages/${data.createConversation.id}`
    );
  };

  const handleNextClick = () => {
    handleCreateConversation(name, users);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={true}
        maxWidth={true}
        TransitionComponent={Transition}
      >
        <AppBarComponent
          level={'secondary'}
          title={'Create new conversation'}
          onBackClick={onClose}
          end={
            <>
              {users?.length > 1 && (
                <Button
                  onClick={handleNextClick}
                  color={'secondary'}
                  variant={'text'}
                >
                  Create group
                </Button>
              )}
            </>
          }
        />
        <NewConversationUserList
          users={users}
          setUsers={setUsers}
          handleCreateConversation={handleCreateConversation}
          name={name}
          setName={setName}
        />
      </Dialog>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default NewConversationDialog;
