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

function PlanStepsItemComponent(props) {
  const { name, description, startDate, number, status } = props;
  const classes = usePlanStepsItemComponent();

  return (
    <>
      <ListItem>
        <PlanStepsItemDragIconComponent />
        <ListItemIcon>
          <PlanStepItemComponentIcon status={status} number={number} />
        </ListItemIcon>
        <ListItemText
          className={classes.itemTest}
          primary={name}
          secondary={description}
        />
        <ListItemText
          className={classes.date}
          secondary={startDate && moment(startDate).format('DD.mm.yyyy')}
        />
        <ListItemIcon></ListItemIcon>
      </ListItem>
    </>
  );
}

PlanStepsItemComponent.propTypes = {
  name: propTypes.string,
  description: propTypes.string,
  startDate: propTypes.number,
};

const usePlanStepsItemComponent = makeStyles((theme) => ({
  itemTest: {
    marginLeft: theme.spacing(2),
  },

  date: {},
}));

export default PlanStepsItemComponent;
