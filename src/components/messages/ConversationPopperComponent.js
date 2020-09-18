import * as React from 'react';
import propTypes from 'prop-types';
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import {
  AddStepIcon,
  TeamzrButtonIcon,
  VerticalDotsIcon,
} from '../../constants/Icons';

function ConversationPopperComponent(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const router = useRouter();
  const conversationId = router.query.conversationId;

  const handleAddCampaign = React.useCallback(() => {
    router.push({ pathname: '/plans/new', query: { conversationId } });
  }, [conversationId]);

  const handleViewPlans = React.useCallback(() => {
    router.push({ pathname: '/my-plans', query: { conversationId } });
  }, [conversationId]);

  const togglePopper = React.useCallback(
    (event) => {
      setAnchorEl(event.target);
    },
    [setAnchorEl]
  );

  return (
    <>
      <IconButton onClick={togglePopper}>
        <VerticalDotsIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchorEl}>
        <Paper>
          <List component={'nav'}>
            <ListItem button onClick={handleAddCampaign}>
              <ListItemIcon>
                <AddStepIcon />
              </ListItemIcon>
              <ListItemText primary={'Create Plan'} />
            </ListItem>
            <ListItem button onClick={handleViewPlans}>
              <ListItemIcon>
                <TeamzrButtonIcon />
              </ListItemIcon>
              <ListItemText primary={'Plans'} />
            </ListItem>
          </List>
        </Paper>
      </Popper>
    </>
  );
}

export default ConversationPopperComponent;
