import * as React from 'react';
import propTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { Drawer, IconButton, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { VerticalDotsIcon } from '../../constants/Icons';
import ConversationSidebarPlans from './ConversationSidebarPlans';
import ConversationSidebarUsers from './ConversationSidebarUsers';
import PlanSettingsDialog from '../PlanSettings/PlanSettingsDialog';

const useStyles = makeStyles({
  root: {},
  paper: {
    top: 68,
    height: 'calc(100% - 175px)',
    backgroundColor: '#f1f6f7',
  },
});

function ConversationSidebarComponent({ conversations }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = !!anchorEl;

  const drawerClasses = useStyles();

  const router = useRouter();
  const conversationId = router.query.conversationId;

  const [planDialogOpen, setPlanDialogOpen] = React.useState(false);
  const onClosePlanDialog = () => {
    setPlanDialogOpen(!planDialogOpen);
  };

  const handleAddCampaign = () => {
    setPlanDialogOpen(true);
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
      <Drawer
        variant={'persistent'}
        classes={drawerClasses}
        hideBackdrop={true}
        elevation={0}
        open={open}
        anchor={'right'}
        anchorEl={anchorEl}
        onClose={togglePopover}
        BackdropProps={{ invisible: true, style: { zIndex: '0' } }}
      >
        <div>
          <IconButton onClick={togglePopover} variant={'contained'}>
            <CloseIcon />
          </IconButton>
          <ConversationSidebarPlans
            handleViewPlans={handleViewPlans}
            handleAddCampaign={handleAddCampaign}
            conversationId={conversationId}
          />
          <ConversationSidebarUsers conversationId={conversationId} />
        </div>
      </Drawer>
      {planDialogOpen && (
        <PlanSettingsDialog
          open={planDialogOpen}
          onClose={onClosePlanDialog}
          conversationId={conversationId}
          conversations={conversations}
        />
      )}
    </>
  );
}

export default ConversationSidebarComponent;
