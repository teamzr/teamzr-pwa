import { useMutation, useQuery } from '@apollo/client';
import { Button, Dialog, IconButton, Slide } from '@material-ui/core';

import moment from 'moment';
import { useRouter } from 'next/router';
import * as React from 'react';
import { VerticalDotsIcon } from '../../constants/Icons';
import {
  CREATE_PLAN_MUTATION,
  UPDATE_PLAN_MUTATION,
} from '../../gql-mutations/mutations';
import { PLAN_QUERY } from '../../gql-queries/queries';

import AppBarComponent from '../AppBarComponent/AppBarComponent';
import { PlanSettingsFormComponent } from './PlanSettingsFormComponent';

function PlanSettingsDialog(props) {
  const { open, onClose, planId, conversationId } = props;

  const isEditing = !!planId;

  const { data, loading } = useQuery(PLAN_QUERY, {
    variables: { planId },
    skip: !isEditing,
  });

  React.useEffect(() => {
    if (!isEditing) return;

    setName(data?.plan?.name);
    setDescription(data?.plan?.description);
    setInterests(data?.plan?.interests);
    setDuration(data?.plan?.stepDuration);
    setRewardDescription(data?.plan?.rewardDescription);
  }, [loading]);

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
          interests: interests.map((i) => i.id),
        },
      },
    });

    const id = res.data.createPlan.id;
    router.push(`/plans/[planId]`, `/plans/${id}`);
  };

  React.useEffect(() => {
    if (loading || !isEditing) return;
    // Todo: add Timeout
    handleSavePlan();
  }, [name, description, startDate, interests, duration, rewardDescription]);

  const [updatePlan] = useMutation(UPDATE_PLAN_MUTATION);
  const handleSavePlan = async () => {
    updatePlan({
      variables: {
        input: {
          id: planId,
          name,
          description,
          startDate,
          rewardDescription,
          stepDuration: duration,
          interests: interests.map((i) => i.id),
        },
      },
    });
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
          title={isEditing ? 'Edit plan' : 'Create new plan'}
          onBackClick={handleBackClick}
          end={
            <>
              {!isEditing && (
                <Button
                  onClick={handleCreatePlan}
                  color={'secondary'}
                  variant={'text'}
                >
                  Create
                </Button>
              )}
              {isEditing && (
                <IconButton>
                  <VerticalDotsIcon color={'white'} />
                </IconButton>
              )}
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
