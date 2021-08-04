import * as React from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import {
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useDrag, useDrop } from 'react-dnd';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';

import PlanStepItemComponentIcon from './PlanStepsItemComponentIcon';
import PlanStepsItemDragIconComponent from './PlanStepsItemDragIconComponent';
import PlanStepsItemComponentPopover from './PlanStepsItemComponentPopover';
import PlanStepsComponentAddStepBtn from './PlanStepsComponentAddStepBtn';
import { ItemTypes } from './PlanStepsConstants';
import isTouchDevice from 'is-touch-device';

function PlanStepsItemComponent(props) {
  const {
    planId,
    planStepId,
    name,
    description: descriptionProp,
    startDate,
    endDate,
    number,
    status,
    onClick,
    parentId,
    moveStep,
    findStep,
    updatePlanStep,
  } = props;
  const classes = usePlanStepsItemComponent();

  const [isDragActive, setIsDragActive] = React.useState(false);
  const onMouseDown = (event) => {
    setIsDragActive(true);
  };

  const originalIndex = findStep(planStepId).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PLAN_STEP, id: planStepId, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => {
      return isDragActive;
    },
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveStep(droppedId, originalIndex, didDrop);
      } else {
        const { planStep, index } = findStep(droppedId);
        updatePlanStep({
          variables: {
            input: {
              id: droppedId,
              number: index + 1,
            },
          },
        });
      }
      setIsDragActive(false);
    },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.PLAN_STEP,
    hover({ id: draggedId }) {
      if (draggedId !== planStepId) {
        const { index: overIndex } = findStep(planStepId);
        moveStep(draggedId, overIndex);
      }
    },
  });

  const handleCLick = () => {
    onClick(planStepId);
  };

  const opacity = isDragging && !isTouchDevice() ? 0 : 1;

  const description =
    `${descriptionProp}` ||
    (status == 'UNDEFINED' && 'Tap to specify step details');
  return (
    <li ref={(node) => drag(drop(node))} style={{ opacity }}>
      <ListItem>
        <PlanStepsItemDragIconComponent onMouseDown={onMouseDown} />
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
        <ListItemIcon>
          <PlanStepsItemComponentPopover
            planId={planId}
            planStepId={planStepId}
            number={number}
          />
        </ListItemIcon>
      </ListItem>
      <Grid container>
        <Grid item>
          <PlanStepsComponentAddStepBtn
            parentId={planStepId}
            planId={planId}
            number={number}
          />
        </Grid>
        <Grid item>
          <ListItemText
            onClick={handleCLick}
            style={{ cursor: 'pointer' }}
            className={classes.itemTest}
            secondary={`Due date ${moment(endDate).utc().format('DD.MM.YYYY')}`}
          />

          <Divider />
        </Grid>
      </Grid>
    </li>
  );
}

PlanStepsItemComponent.propTypes = {
  name: propTypes.string,
  description: propTypes.string,
  endDate: propTypes.number,
  onClick: propTypes.func,
};

const usePlanStepsItemComponent = makeStyles((theme) => ({
  itemTest: {
    marginLeft: theme.spacing(2),
  },

  date: {},
}));

export default PlanStepsItemComponent;
