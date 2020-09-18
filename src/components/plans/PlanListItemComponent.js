import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { MoneyRewardIcon } from '../../constants/Icons';

function PlanListItemComponent(props) {
  const { planId, name, conversationName } = props;
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    router.push('/plans/[planId]', `/plans/${planId}`);
  }, [planId]);
  return (
    <ListItem onClick={handleClick}>
      <ListItemIcon>
        <MoneyRewardIcon style={{ width: '40px', height: '40px' }} />
      </ListItemIcon>
      <ListItemText primary={name} secondary={conversationName} />
    </ListItem>
  );
}

PlanListItemComponent.propTypes = {
  name: propTypes.string,
  planId: propTypes.string,
};

export default PlanListItemComponent;
