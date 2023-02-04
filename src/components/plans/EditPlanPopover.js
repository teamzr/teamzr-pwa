import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import AlertDialogComponent from '../AlertDialog/AlertDialogComponent';
import PlanSettingsDialog from '../PlanSettings/PlanSettingsDialog';
import PlanListItemPopoverComponent from './PlanListItemPopoverComponent';
import { gql } from 'apollo-boost';
import { Button } from '@material-ui/core';
import { PLANS_QUERY } from '../../pages/my-plans';
import { useRouter } from 'next/router';

const DELETE_PLAN_MUTATION = gql`
  mutation deletePlan($id: ID!) {
    deletePlan(id: $id)
  }
`;

const PLAN_CONVERSATION_QUERY = gql`
  query planConversation($planId: ID!) {
    plan(id: $planId) {
      id
      name
      conversation {
        id
      }
    }
    conversations {
      id
      name
      type
    }
  }
`;

export default function EditPlanPopover({ planId, ...props }) {
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
  const [planEditOpen, setPlanEditOpen] = React.useState(false);
  const apolloClient = useApolloClient();

  const { data, loading, error } = useQuery(PLAN_CONVERSATION_QUERY, {
    variables: { planId },
    skip: !planEditOpen,
  });

  const conversationId = data?.plan?.conversation?.id;

  const conversations = data?.conversations;

  data?.planConversation?.array.forEach((element) => {});

  const [deletePlan] = useMutation(DELETE_PLAN_MUTATION, {
    onCompleted: (data) => {
      setAlertDialogOpen(false);
    },
    update: (cache, { data }) => {
      const { plans } = apolloClient.readQuery({
        query: PLANS_QUERY,
      });

      const newPlans = [...plans];
      const index = newPlans.findIndex((s) => s.id == planId);
      newPlans.splice(index, 1);

      apolloClient.writeQuery({
        query: PLANS_QUERY,
        data: { plans: newPlans },
      });
    },
  });

  const router = useRouter();

  const onRemoveClick = () => {
    deletePlan({ variables: { id: planId } });
    router.push('/my-plans');
  };

  const handleOpenDialog = () => {
    setAlertDialogOpen(true);
  };

  const onToggleEditClick = () => {
    setPlanEditOpen(!planEditOpen);
  };
  if (loading) return '....';
  return (
    <>
      <PlanListItemPopoverComponent
        onRemoveClick={handleOpenDialog}
        onEditClick={onToggleEditClick}
        {...props}
      />
      <AlertDialogComponent
        open={alertDialogOpen}
        title={'Plan delete confirmation'}
        text={'Are sure you want to delete this plan?'}
        actionButtons={
          <>
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={() => setAlertDialogOpen(false)}
            >
              No
            </Button>
            <Button onClick={onRemoveClick}>Yes</Button>
          </>
        }
      />
      <PlanSettingsDialog
        open={planEditOpen}
        onClose={onToggleEditClick}
        planId={planId}
        conversations={conversations}
        conversationId={conversationId}
      />
    </>
  );
}
