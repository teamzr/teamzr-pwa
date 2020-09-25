import * as React from 'react';
import propTypes from 'prop-types';
import { IconButton, makeStyles } from '@material-ui/core';
import { DragStepIcon } from '../../constants/Icons';

function PlanStepsItemDragIconComponent(props) {
  const { onMouseDown } = props;
  const classes = usePlanStepsItemDragIconComponent();
  return (
    <IconButton
      className={classes.root}
      itemID={'Drag'}
      id={'drag'}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <DragStepIcon />
    </IconButton>
  );
}

const usePlanStepsItemDragIconComponent = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(-4),
  },
}));

export default PlanStepsItemDragIconComponent;
