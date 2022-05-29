import { useMutation } from '@apollo/client';
import { Button, Dialog, Slide } from '@material-ui/core';

import moment from 'moment';
import { useRouter } from 'next/router';
import * as React from 'react';
import { CREATE_PLAN_MUTATION } from '../../gql-mutations/mutations';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import { PlanSettingsFormComponent } from './PlanSettingsFormComponent';

function PlanSettingsDialog(props) {
  const { open, onClose, planId, conversationId } = props;

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState('DAY');
  const [interests, setInterests] = React.useState([]);
  const [startDate, setStartDate] = React.useState(moment());
  const [rewardDescription, setRewardDescription] = React.useState('');

  const router = useRouter();

  const [createPlan] = useMutation(CREATE_PLAN_MUTATION);

  const handleCreatePlan = async () => {
    const res = await createPlan({
      variables: {
        input: {
          name,
          description,
          startDate: startDate,
          stepDuration: duration,
          rewardDescription,
          conversationId,
        },
      },
    });

    const id = res.data.createPlan.id;
    router.push(`/plans/[planId]`, `/plans/${id}`);
  };

  const handleBackClick = () => {
    onClose();
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
                onClick={handleCreatePlan}
                color={'secondary'}
                variant={'text'}
              >
                Create
              </Button>
            </>
          }
        />
        <PlanSettingsFormComponent
          planId={planId}
          conversationId={conversationId}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          duration={duration}
          setDuration={setDuration}
          interests={interests}
          setInterests={setInterests}
          startDate={startDate}
          setStartDate={setStartDate}
          rewardDescription={rewardDescription}
          setRewardDescription={setRewardDescription}
          handleCreatePlan={handleCreatePlan}
        />
      </Dialog>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default PlanSettingsDialog;
