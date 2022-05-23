import { useMutation } from '@apollo/client';
import { Button, Dialog, Slide } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import * as React from 'react';
import AppBarComponent from '../AppBarComponent/AppBarComponent';

const CREATE_CONVERSATION = gql`
  mutation createConversation($input: ConversationCreateInput!) {
    createConversation(input: $input) {
      id
    }
  }
`;

function PlanSettingsDialog(props) {
  const { open, onClose } = props;

  const [users, setUsers] = React.useState([]);
  const [name, setName] = React.useState('');
  const [isCreatingGroup, setIsCreatingGroup] = React.useState(false);

  const [createConversation] = useMutation(CREATE_CONVERSATION, {
    onCompleted: () => {
      onClose();
    },
  });
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
    if (users.length > 1) {
      handleCreateConversation(name, users);
    }
  };

  const handleBackClick = () => {
    if (isCreatingGroup) {
      setIsCreatingGroup(false);
    }
    if (!isCreatingGroup) {
      onClose();
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={true}
        maxWidth={'md'}
        TransitionComponent={Transition}
      >
        <AppBarComponent
          level={'secondary'}
          title={'Create new plan'}
          onBackClick={handleBackClick}
          end={
            <>
              <Button
                onClick={handleNextClick}
                color={'secondary'}
                variant={'text'}
              >
                Create
              </Button>
            </>
          }
        />
      </Dialog>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default PlanSettingsDialog;
