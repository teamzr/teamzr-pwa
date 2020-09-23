import { makeStyles } from '@material-ui/core';
import { COLORS } from '../../constants/Colors';

export const usePlanStepsItemComponentIconStyle = makeStyles((theme) => ({
  icon: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  iconText: {
    fontFamily: 'Lato',
    fontWeight: '700',
    fontSize: '16px',
    textTransform: 'uppercase',
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(4),
  },
  undefined: {
    color: COLORS.planStepUndefined,
  },
  completed: {
    color: COLORS.planStepCompleted,
  },
  upcoming: {
    color: COLORS.planStepUpcoming,
  },
  current: {
    color: COLORS.planStepCurrent,
  },
}));
