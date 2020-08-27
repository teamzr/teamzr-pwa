import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';

import DefaultLayout from '../../pagesLayouts/DefaultLayout';
import NewCampaignComponent from '../../components/campaigns/NewCampaignComponent';

function NewCampaign() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <NewCampaignComponent />
    </DefaultLayout>
  );
}

export default NewCampaign;
