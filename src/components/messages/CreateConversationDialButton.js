import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import * as React from 'react';
import { AddStepIcon } from '../../constants/Icons';
import NewConversationDialog from './newConversation/NewConversationDialog';

const actions = [
  { name: 'Group', icon: AddStepIcon },
  { name: 'Class', icon: AddStepIcon },
  { name: 'Individual', icon: AddStepIcon },
];

export default function CreateConversationDialButton(props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  return (
    <>
      <SpeedDial
        ariaLabel="Create new convesation"
        style={{ position: 'fixed', top: 'calc(100vh - 180px)', left: 8 }}
        icon={<SpeedDialIcon />}
        onClick={toggleDialog}
      ></SpeedDial>
      <NewConversationDialog open={isDialogOpen} onClose={toggleDialog} />
    </>
  );
}
