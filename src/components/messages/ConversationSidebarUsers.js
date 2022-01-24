import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { AddStepIcon, TeamzrButtonIcon } from '../../constants/Icons';
import AccordionComponent from '../AccordionComponent';


export default function CoversationSidebarUsers() {

    return (
      <AccordionComponent summaryTitle={'Coversation Users'}>
                
                <List component={'nav'}>             
            <ListItem button>
              <ListItemIcon>
                <AddStepIcon />
              </ListItemIcon>
              <ListItemText primary={'Create Plan'} />
            </ListItem>
            <ListItem button >
              <ListItemIcon>
                <TeamzrButtonIcon />
              </ListItemIcon>
              <ListItemText primary={'Plans'} />
            </ListItem>
          </List>
      </AccordionComponent>
    )
}