import * as React from 'react';
import propTypes from 'prop-types';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popover,
  Popper,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import {
  AddStepIcon,
  TeamzrButtonIcon,
  VerticalDotsIcon,
} from '../../constants/Icons';

function PlanListItemPopoverComponent({
  onRemoveClick,
  onEditClick,
  ...restProps
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const router = useRouter();

  // TODO ??
  const conversationId = router.query.conversationId;

  const handleEdit = () => {
    setAnchorEl(null);
    onEditClick();
  };

  const handleRemove = () => {
    setAnchorEl(null);
    onRemoveClick();
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
        <VerticalDotsIcon
          style={{ width: '24px', height: '16px' }}
          {...restProps}
        />
      </IconButton>
      <Popover open={open} onClose={togglePopover} anchorEl={anchorEl}>
        <Paper>
          <List component={'nav'}>
            <ListItem button onClick={handleEdit}>
              <ListItemText primary={'Edit Plan'} />
            </ListItem>
            <ListItem button onClick={handleRemove}>
              <ListItemText primary={'Remove Plan'} />
            </ListItem>
          </List>
        </Paper>
      </Popover>
    </>
  );
}

export default PlanListItemPopoverComponent;
