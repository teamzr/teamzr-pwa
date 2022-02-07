import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';
import { AddStepIcon, TeamzrButtonIcon } from '../../constants/Icons';
import AccordionComponent from '../AccordionComponent';


export default function CoversationSidebarPlans() {

    return (
      <AccordionComponent summaryTitle={'Plans'}>
       <List component={'nav'}>   
       <ListItem button >
              <ListItemIcon>
                <TeamzrButtonIcon />
              </ListItemIcon>
              <ListItemText primary={'Plans'} />
            </ListItem>         
            <ListItem button>
              <ListItemIcon>
                <AddStepIcon />
              </ListItemIcon>
              <ListItemText primary={'Create Plan'} />
            </ListItem>
          </List>
      </AccordionComponent>
    )
}