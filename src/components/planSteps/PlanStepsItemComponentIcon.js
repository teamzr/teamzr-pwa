import * as React from 'react';
import propTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import {
  CompletedStepIcon,
  CurrentStepIcon,
  SearchIcon,
  UndefinedStepIcon,
  UpcomingStepIcon,
} from '../../constants/Icons';
import { usePlanStepsItemComponentIconStyle } from './PlanStepsItemComponentIcon.Style';
import { PLAN_STEP_STATUSES } from './PlanStepsConstants';

function PlanStepItemComponentIcon(props) {
  const { status, number } = props;

  const classes = usePlanStepsItemComponentIconStyle();

  const StepIconMap = {
    [PLAN_STEP_STATUSES.UNDEFINED]: UndefinedStepIcon,
    [PLAN_STEP_STATUSES.COMPLETED]: CompletedStepIcon,
    [PLAN_STEP_STATUSES.UPCOMING]: UpcomingStepIcon,
    [PLAN_STEP_STATUSES.CURRENT]: CurrentStepIcon,
    [PLAN_STEP_STATUSES.REVIEW]: SearchIcon
  };

  const StepIcon = StepIconMap[status];

  return (
    <>
      <Typography
        className={clsx(classes.iconText, {
          [classes.undefined]: status == PLAN_STEP_STATUSES.UNDEFINED,
          [classes.completed]: status == PLAN_STEP_STATUSES.COMPLETED,
          [classes.upcoming]: status == PLAN_STEP_STATUSES.UPCOMING,
          [classes.current]: status == PLAN_STEP_STATUSES.CURRENT,
          [classes.review]: status == PLAN_STEP_STATUSES.REVIEW,
        })}
      >
        {`Step ${number}`}
      </Typography>
      <StepIcon className={classes.icon} />
    </>
  );
}

PlanStepItemComponentIcon.propTypes = {
  status: propTypes.oneOf(['COMPLETED', 'CURRENT', 'UPCOMING', 'REVIEW', 'UNDEFINED']),
};

export default PlanStepItemComponentIcon;
