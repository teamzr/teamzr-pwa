import * as React from 'react';
import propTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import {
  CompletedStepIcon,
  CurrentStepIcon,
  UndefinedStepIcon,
  UpcomingStepIcon,
} from '../../constants/Icons';
import { usePlanStepsItemComponentIconStyle } from './PlanStepsItemComponentIcon.Style';
import { PLAN_STEP_STATUSES } from './PlanStepsComponent';

function PlanStepItemComponentIcon(props) {
  const { status, number } = props;

  const classes = usePlanStepsItemComponentIconStyle();

  const StepIconMap = {
    [PLAN_STEP_STATUSES.UNDEFINED]: UndefinedStepIcon,
    [PLAN_STEP_STATUSES.COMPLETED]: CompletedStepIcon,
    [PLAN_STEP_STATUSES.UPCOMING]: UpcomingStepIcon,
    [PLAN_STEP_STATUSES.CURRENT]: CurrentStepIcon,
  };

  const StepIcon = StepIconMap[status];

  return (
    <>
      <Typography
        className={clsx(classes.iconText, {
          [classes.completed]: status == PLAN_STEP_STATUSES.COMPLETED,
          [classes.upcoming]: status == PLAN_STEP_STATUSES.UPCOMING,
          [classes.current]: status == PLAN_STEP_STATUSES.CURRENT,
        })}
      >
        {`Step ${number}`}
      </Typography>
      <StepIcon className={classes.icon} />
    </>
  );
}

PlanStepItemComponentIcon.propTypes = {
  status: propTypes.oneOf(['COMPLETED', 'CURRENT', 'UPCOMING', 'UNDEFINED']),
};

export default PlanStepItemComponentIcon;
