import * as React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PlanStepItemComponentIcon from './PlanStepsItemComponentIcon';
import PlanStepsItemDragIconComponent from './PlanStepsItemDragIconComponent';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
import PlanStepsItemComponentPopover from './PlanStepsItemComponentPopover';

function PlanStepsItemComponent(props) {
  const {
    planId,
    planStepId,
    name,
    description: descriptionProp,
    startDate,
    number,
    status,
    onClick,
  } = props;
  const classes = usePlanStepsItemComponent();

  const handleCLick = React.useCallback(() => {
    onClick(planStepId);
  }, [planStepId]);

  const description =
    descriptionProp || (status == 'UNDEFINED' && 'Tap to specify step details');
  return (
    <ListItem>
      <PlanStepsItemDragIconComponent />
      <ListItemIcon onClick={handleCLick} style={{ cursor: 'pointer' }}>
        <PlanStepItemComponentIcon status={status} number={number} />
      </ListItemIcon>
      <ListItemText
        onClick={handleCLick}
        style={{ cursor: 'pointer' }}
        className={classes.itemTest}
        primary={name}
        secondary={description}
      />
      <ListItemText
        className={classes.date}
        secondary={startDate && moment(startDate).format('DD.mm.yyyy')}
      />
      <ListItemIcon>
        <PlanStepsItemComponentPopover
          planId={planId}
          planStepId={planStepId}
          number={number}
        />
      </ListItemIcon>
    </ListItem>
  );
}

PlanStepsItemComponent.propTypes = {
  name: propTypes.string,
  description: propTypes.string,
  startDate: propTypes.number,
  onClick: propTypes.func,
};

const usePlanStepsItemComponent = makeStyles((theme) => ({
  itemTest: {
    marginLeft: theme.spacing(2),
  },

  date: {},
}));

export default PlanStepsItemComponent;
