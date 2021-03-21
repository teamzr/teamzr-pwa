import * as React from 'react';
import { IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import { BackArrowIcon } from '../constants/Icons';

function BackBtnComponent(props) {
  const router = useRouter();
  const handleBackToConversations = () => {
    router.back();
  };
  return (
    <IconButton onClick={handleBackToConversations}>
      <BackArrowIcon style={{ color: 'transparent' }} />
    </IconButton>
  );
}

export default BackBtnComponent;
