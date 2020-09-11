import * as React from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

function CampaignListItemComponent(props) {
  const { campaignId, name } = props;
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    router.push('/campaigns/[campaignId]', `/campaigns/${campaignId}`);
  }, [campaignId]);
  return <Button onClick={handleClick}>{name}</Button>;
}

CampaignListItemComponent.propTypes = {
  name: propTypes.string,
  campaignId: propTypes.string,
};

export default CampaignListItemComponent;
