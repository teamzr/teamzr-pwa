import { useQuery } from '@apollo/client';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import * as React from 'react';
import { AddStepIcon, TeamzrButtonIcon } from '../../constants/Icons';
import AccordionComponent from '../AccordionComponent';

const COVERSATION_PLANS_QUERY = gql`
  query plans($conversationId: ID) {
    plans(conversationId: $conversationId) {
      id
      name
      description
    }
  }
`;

export default function CoversationSidebarPlans({
  handleAddCampaign,
  handleViewPlans,
  conversationId,
}) {
  const { loading, error, data } = useQuery(COVERSATION_PLANS_QUERY, {
    variables: {
      conversationId,
    },
  });
  const router = useRouter();
  const handlePlanClick = (planId) => {
    router.push(`/plans/[planId]`, `/plans/${planId}`);
  };

  return (
    <AccordionComponent summaryTitle={'Plans'}>
      <List component={'nav'}>
        {data?.plans?.map((plan, i) => (
          <ListItem button key={i} onClick={() => handlePlanClick(plan.id)}>
            <ListItemText primary={plan.name} />
          </ListItem>
        ))}
        <ListItem button onClick={handleViewPlans}>
          <ListItemIcon>
            <TeamzrButtonIcon />
          </ListItemIcon>
          <ListItemText primary={'more...'} />
        </ListItem>
        <ListItem button onClick={handleAddCampaign}>
          <ListItemIcon>
            <AddStepIcon />
          </ListItemIcon>
          <ListItemText primary={'Create Plan'} />
        </ListItem>
      </List>
    </AccordionComponent>
  );
}
