import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useApolloClient, useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import {
  Button,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { MoneyRewardIcon, VerticalDotsIcon } from '../../constants/Icons';
import PlanListItemPopoverComponent from './PlanListItemPopoverComponent';
import AlertDialogComponent from '../AlertDialog/AlertDialogComponent';
import { PLANS_QUERY } from '../../pages/my-plans';
import PlanSettingsDialog from '../PlanSettings/PlanSettingsDialog';

const DELETE_PLAN_MUTATION = gql`
  mutation deletePlan($id: ID!) {
    deletePlan(id: $id)
  }
`;

function PlanListItemComponent(props) {
  const { planId, name, conversationName, conversations, conversationId } =
    props;
  const router = useRouter();

  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
  const [planEditOpen, setPlanEditOpen] = React.useState(false);
  const apolloClient = useApolloClient();
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

  const handleClick = () => {
    router.push('/plans/[planId]', `/plans/${planId}`);
  };

  const onRemoveClick = () => {
    deletePlan({ variables: { id: planId } });
  };

  const handleOpenDialog = () => {
    setAlertDialogOpen(true);
  };

  const onToggleEditClick = () => {
    setPlanEditOpen(!planEditOpen);
  };

  return (
    <>
      <ListItem button>
        <ListItem onClick={handleClick}>
          <ListItemText primary={name} secondary={conversationName} />
        </ListItem>
        <ListItemIcon>
          <PlanListItemPopoverComponent
            onRemoveClick={handleOpenDialog}
            onEditClick={onToggleEditClick}
          />
        </ListItemIcon>
      </ListItem>
      <Divider variant={'inset'} component={'div'} />
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

PlanListItemComponent.propTypes = {
  name: propTypes.string,
  planId: propTypes.string,
};

export default PlanListItemComponent;
