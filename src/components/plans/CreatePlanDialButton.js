import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import * as React from 'react';
import { AddStepIcon } from '../../constants/Icons';
import PlanSettingsDialog from '../PlanSettings/PlanSettingsDialog';

const actions = [
  { name: 'Group', icon: AddStepIcon },
  { name: 'Class', icon: AddStepIcon },
  { name: 'Individual', icon: AddStepIcon },
];

export default function CreatePlanDialButton(props) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  return (
    <>
      <SpeedDial
        ariaLabel="Create new convesation"
        style={{ position: 'fixed', top: 'calc(100vh - 180px)', right: 20 }}
        icon={<SpeedDialIcon />}
        onClick={toggleDialog}
      ></SpeedDial>
      <PlanSettingsDialog open={isDialogOpen} onClose={toggleDialog} />
    </>
  );
}
