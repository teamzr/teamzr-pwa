import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import CampaignListItemComponent from './CampaignListItemComponent';

function CampaingListComponent(props) {
  const { campaigns, conversationId } = props;

  const campaignsSelection = campaigns.filter(
    (campaign) =>
      campaign.conversation.id == conversationId || conversationId == null
  );

  return (
    <Grid container direction={'column'}>
      {campaignsSelection.map((c, i) => (
        <Grid item key={i}>
          <CampaignListItemComponent name={c.name} campaignId={c.id} />
        </Grid>
      ))}
    </Grid>
  );
}

CampaingListComponent.propTypes = {
  campaings: propTypes.array,
  conversationId: propTypes.string,
};

export default CampaingListComponent;
