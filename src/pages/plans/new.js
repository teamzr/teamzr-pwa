import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';

import DefaultLayout from '../../pagesLayouts/DefaultLayout';
import NewPlannComponent from '../../components/plans/NewPlanComponent';

function NewCampaign() {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <DefaultLayout>
      <NewPlannComponent conversationId={conversationId} />
    </DefaultLayout>
  );
}

export default NewCampaign;
