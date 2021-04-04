import * as React from 'react';
import propTypes from 'prop-types';
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
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

  const handleAddCampaign = () => {
    router.push({ pathname: '/plans/new', query: { conversationId } });
  };

  const handleViewPlans = () => {
    router.push({ pathname: '/my-plans', query: { conversationId } });
  };

  const togglePopover = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.target);
    }
  };

  return (
    <>
      <IconButton onClick={togglePopover}>
        <VerticalDotsIcon />
      </IconButton>
      <Popover open={open} anchorEl={anchorEl} onClose={togglePopover}>
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
      </Popover>
    </>
  );
}

export default ConversationPopperComponent;
