import { useMutation, useQuery } from '@apollo/client';
import { Button, Dialog, IconButton, Slide } from '@material-ui/core';

import moment from 'moment';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  CREATE_PLAN_MUTATION,
  UPDATE_PLAN_MUTATION,
} from '../../gql-mutations/mutations';
import { PLAN_QUERY } from '../../gql-queries/queries';

import AppBarComponent from '../AppBarComponent/AppBarComponent';
import { PlanSettingsFormComponent } from './PlanSettingsFormComponent';
import { CONVERSATION_QUERY } from '../../gql-queries/conversationQueries';

function PlanSettingsDialog(props) {
  const {
    open,
    onClose,
    planId,
    conversationId,
    conversations,
    setConversationId,
  } = props;

  const isEditing = !!planId;

  const { data, loading } = useQuery(PLAN_QUERY, {
    variables: { planId },
    skip: !isEditing,
    fetchPolicy: 'network-only',
    skip: !open,
  });

  const [dataLoaded, setDataLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isEditing) return;

    setName(data?.plan?.name);
    setDescription(data?.plan?.description);
    setInterests(data?.plan?.interests);
    setDuration(data?.plan?.stepDuration);
    setRewardDescription(data?.plan?.rewardDescription);
    setStartDate(data?.plan?.startDate);

    setMentors(data?.plan?.mentors?.map((m) => m.user.id));
    setMembers(data?.plan?.members?.map((m) => m.user.id));
    setIsMentored(data?.plan?.isMentored);
    setIsReview(data?.plan?.isReview);
    setDataLoaded(true);
  }, [loading]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [duration, setDuration] = React.useState('DAY');
  const [interests, setInterests] = React.useState([]);
  const [startDate, setStartDate] = React.useState(null); // ALT: moment().hours(0).minute(0)
  const [rewardDescription, setRewardDescription] = React.useState('');

  const {
    data: mb,
    isLoading: mbIsLoading,
    error,
  } = useQuery(CONVERSATION_QUERY, {
    variables: { conversationId: conversationId },
  });
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    if (!mbIsLoading && !isEditing) {
      const mbrs = mb?.conversation?.users?.map((v) => v.id);
      console.log(mb);

      setMembers(mbrs);
    }
  }, [mbIsLoading, mb]);
  const [mentors, setMentors] = React.useState([]);
  const [isMentored, setIsMentored] = React.useState(false);
  const [isReview, setIsReview] = React.useState(false);

  const router = useRouter();

  const [createPlan] = useMutation(CREATE_PLAN_MUTATION);

  const handleCreatePlan = async () => {
    // TODO: Refactor
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
          mentors,
          members,
          isMentored,
          isReview,
        },
      },
    });

    const id = res.data.createPlan.id;
    router.push(`/plans/[planId]`, `/plans/${id}`);
  };

  React.useEffect(() => {
    if (loading || !data || !isEditing) return;
    // Todo: add Timeout
    if (open && dataLoaded) {
      handleSavePlan();
    }
  }, [
    name,
    description,
    startDate,
    interests,
    duration,
    rewardDescription,
    open,
    members,
    mentors,
    isReview,
    isMentored,
  ]);

  const [updatePlan] = useMutation(UPDATE_PLAN_MUTATION);
  const handleSavePlan = async () => {
    await updatePlan({
      variables: {
        input: {
          id: planId,
          name,
          description,
          startDate,
          rewardDescription,
          stepDuration: duration,
          interests: interests.map((i) => i.id),
          members: members,
          mentors: mentors,
          isReview: isReview,
          isMentored: isMentored,
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
            </>
          }
        />
        {open && (
          <PlanSettingsFormComponent
            planId={planId}
            conversations={conversations}
            conversationId={conversationId}
            setConversationId={setConversationId}
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
            members={members}
            setMembers={setMembers}
            mentors={mentors}
            setMentors={setMentors}
            isMentored={isMentored}
            setIsMentored={setIsMentored}
            isReview={isReview}
            setIsReview={setIsReview}
          />
        )}
      </Dialog>
    </>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default PlanSettingsDialog;
