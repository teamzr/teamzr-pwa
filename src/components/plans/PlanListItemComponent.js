import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { MoneyRewardIcon, VerticalDotsIcon } from '../../constants/Icons';
import PlanListItemPopoverComponent from './PlanListItemPopoverComponent';

function PlanListItemComponent(props) {
  const { planId, name, conversationName } = props;
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    router.push('/plans/[planId]', `/plans/${planId}`);
  }, [planId]);
  return (
    <ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <MoneyRewardIcon style={{ width: '40px', height: '40px' }} />
        </ListItemIcon>
        <ListItemText primary={name} secondary={conversationName} />
        <Divider />
      </ListItem>
      <ListItemIcon>
        <PlanListItemPopoverComponent />
      </ListItemIcon>
    </ListItem>
  );
}

PlanListItemComponent.propTypes = {
  name: propTypes.string,
  planId: propTypes.string,
};

export default PlanListItemComponent;
