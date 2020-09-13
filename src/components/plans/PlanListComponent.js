import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import PlanListItemComponent from './PlanListItemComponent';

function PlanListComponent(props) {
  const { campaigns, conversationId } = props;

  const campaignsSelection = campaigns.filter(
    (campaign) =>
      campaign.conversation.id == conversationId || conversationId == null
  );

  return (
    <Grid container direction={'column'}>
      {campaignsSelection.map((c, i) => (
        <Grid item key={i}>
          <PlanListItemComponent name={c.name} campaignId={c.id} />
        </Grid>
      ))}
    </Grid>
  );
}

PlanListComponent.propTypes = {
  campaings: propTypes.array,
  conversationId: propTypes.string,
};

export default PlanListComponent;
