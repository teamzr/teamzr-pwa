import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popover,
} from '@material-ui/core';
import * as React from 'react';
import { VerticalDotsIcon } from '../../constants/Icons';

export function ConversationSidebarUsersItemActions(props) {
  const { userId, onRemoveClick, onProfileClick } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const togglePopover = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.target);
    }
  };

  const handleProfileClick = () => {
    onProfileClick(userId);
  };

  const handleRemove = () => {
    onRemoveClick(userId);
  };

  return (
    <>
      <IconButton
        onClick={togglePopover}
        style={{ width: '12px', height: '12px' }}
      >
        <VerticalDotsIcon style={{ width: '24px', height: '16px' }} />
      </IconButton>
      <Popover open={open} onClose={togglePopover} anchorEl={anchorEl}>
        <Paper>
          <List component={'nav'}>
            <ListItem button onClick={handleProfileClick}>
              <ListItemText primary={'Profile'} />
            </ListItem>
            <ListItem button onClick={handleRemove}>
              <ListItemText primary={'Remove'} />
            </ListItem>
          </List>
        </Paper>
      </Popover>
    </>
  );
}
