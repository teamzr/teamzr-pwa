import * as React from 'react';
import { Button } from '@material-ui/core';
import { Chip, Grid, Typography, makeStyles, styled } from '@material-ui/core';
import { BorderColor } from '@material-ui/icons';
import clsx from 'clsx';
import { COLORS } from '../../constants/Colors';

export const FULFILLMENT_VALUE = {
  FAILED: 'FAILED',
  SUCEEDED: 'SUCEEDED',
  NOT_RATED: 'NOT_RATED',
};

function FullfilmentChipBarSelect(props) {
  const { disabled, onChange, value } = props;

  return (
    <Grid container direction={'column'}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <ChipBarItem
              disabled={disabled}
              type={'failed'}
              style={{
                background:
                  value == FULFILLMENT_VALUE.FAILED && COLORS.planStepFailed,
                color: value == FULFILLMENT_VALUE.FAILED && COLORS.white,
                BorderColor:
                  value != FULFILLMENT_VALUE.FAILED && COLORS.planStepFailed,
              }}
              value={FULFILLMENT_VALUE.FAILED}
              label={'Failed'}
              clickable={true}
              onClick={onChange}
              variant={
                value == FULFILLMENT_VALUE.FAILED ? 'default' : 'outlined'
              }
            />
          </Grid>
          <Grid item>
            <ChipBarItem
              disabled={disabled}
              type={'succeded'}
              style={{
                background:
                  value == FULFILLMENT_VALUE.SUCEEDED &&
                  COLORS.planStepSuceeded,
                color: value == FULFILLMENT_VALUE.SUCEEDED && COLORS.white,
                borderColor:
                  value != FULFILLMENT_VALUE.SUCEEDED &&
                  COLORS.planStepSuceeded,
              }}
              value={FULFILLMENT_VALUE.SUCEEDED}
              label={'Succeeded'}
              clickable={true}
              onClick={onChange}
              variant={
                value == FULFILLMENT_VALUE.SUCEEDED ? 'default' : 'outlined'
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const NotRatedButton = styled(Button)({
  borderRadius: '12px',
  colorAdjust: 'red',
});

export const ChipBarItem = (props) => {
  const { disabled, variant, label, value, onClick, style, type } = props;
  const classes = makeChipBarItemStyle();

  const handleClick = () => {
    onClick(value);
  };
  return (
    <Chip
      disabled={disabled}
      style={style}
      onClick={handleClick}
      variant={variant}
      classes={{
        colorPrimary: clsx({
          [classes.failed]: type == 'failed',
          [classes.succeeded]: type == 'succeded',
        }),
      }}
      label={label}
      clickable={true}
      color={'primary'}
    />
  );
};

const makeChipBarItemStyle = makeStyles((theme) => ({
  failed: {
    borderColor: COLORS.planStepFailedColor,
    color: COLORS.planStepFailedColor,
  },
  succeeded: {
    borderColor: COLORS.planStepSuceededColor,
    color: COLORS.planStepSuceededColor,
  },
}));

export default FullfilmentChipBarSelect;
