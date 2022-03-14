import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
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

const DELETE_PLAN_MUTATION = gql`
  mutation deletePlan($id: ID!) {
    deletePlan(id: $id)
  }
`;

function PlanListItemComponent(props) {
  const { planId, name, conversationName } = props;
  const router = useRouter();

  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);

  const [deletePlan] = useMutation(DELETE_PLAN_MUTATION, {
    onCompleted: () => {
      setAlertDialogOpen(false);
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

  return (
    <>
      <ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <MoneyRewardIcon style={{ width: '40px', height: '40px' }} />
          </ListItemIcon>
          <ListItemText primary={name} secondary={conversationName} />
        </ListItem>
        <ListItemIcon>
          <PlanListItemPopoverComponent onRemoveClick={handleOpenDialog} />
        </ListItemIcon>
      </ListItem>
      <Divider variant={'inset'} component={'li'} />
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
    </>
  );
}

PlanListItemComponent.propTypes = {
  name: propTypes.string,
  planId: propTypes.string,
};

export default PlanListItemComponent;
