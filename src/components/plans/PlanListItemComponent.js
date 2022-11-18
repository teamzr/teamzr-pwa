import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import EditPlanPopover from './EditPlanPopover';

function PlanListItemComponent(props) {
  const { planId, name, conversationName, conversations, conversationId } =
    props;
  const router = useRouter();

  const handleClick = () => {
    router.push('/plans/[planId]', `/plans/${planId}`);
  };

  return (
    <>
      <ListItem button>
        <ListItem onClick={handleClick}>
          <ListItemText primary={name} secondary={conversationName} />
        </ListItem>
        <ListItemIcon>
          <EditPlanPopover
            planId={planId}
            conversationId={conversationId}
            conversations={conversations}
          />
        </ListItemIcon>
      </ListItem>
      <Divider variant={'inset'} component={'div'} />
    </>
  );
}

PlanListItemComponent.propTypes = {
  name: propTypes.string,
  planId: propTypes.string,
};

export default PlanListItemComponent;
