import * as React from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';

export default function AccordionComponent(props) {
    const {expanded, summaryTitle, children, onChange} = props

    return (
        <Accordion expanded={expanded} onChange={onChange} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>{summaryTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography>
           {children}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
}