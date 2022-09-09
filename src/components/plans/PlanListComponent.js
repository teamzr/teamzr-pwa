import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, Button, List, makeStyles } from '@material-ui/core';
import PlanListItemComponent from './PlanListItemComponent';

function PlanListComponent(props) {
  const { plans, conversationId, conversations } = props;

  const classes = usePlanListComponent();

  const planSelection = plans.filter(
    (plan) => plan.conversation.id == conversationId || conversationId == null
  );

  return (
    <Grid container direction={'column'} className={classes.container}>
      <Grid item xs={12}>
        <List>
          {planSelection.map((plan, i) => (
            <PlanListItemComponent
              key={i}
              name={plan.name}
              planId={plan.id}
              conversationName={plan.conversation.name}
              conversations={conversations}
              conversationId={plan?.conversation?.id}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

PlanListComponent.propTypes = {
  campaings: propTypes.array,
  conversationId: propTypes.string,
};

const usePlanListComponent = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(5),
  },
}));

export default PlanListComponent;
