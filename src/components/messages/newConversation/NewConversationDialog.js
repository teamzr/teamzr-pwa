import { Dialog, DialogContent, Slide } from '@material-ui/core';
import * as React from 'react';
import AppBarComponent from '../../AppBarComponent/AppBarComponent';
import NewConversationUserList from './NewConversationUserLis';

function NewConversationDialog(props) {
  const { open, onClose } = props;
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullScreen={true}
        maxWidth={true}
        TransitionComponent={Transition}
      >
        <AppBarComponent level={'secondary'} onBackClick={onClose} />
        <NewConversationUserList />
      </Dialog>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default NewConversationDialog;
