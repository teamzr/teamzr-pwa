import * as React from 'react';
import { Button, Icon, IconButton } from '@material-ui/core';
import { Chip, Grid, Typography, makeStyles, styled } from '@material-ui/core';
import { BorderColor } from '@material-ui/icons';
import clsx from 'clsx';
import { COLORS } from '../../constants/Colors';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export const FULFILLMENT_VALUE = {
  FAILED: 'FAILED',
  SUCCEEDED: 'SUCCEEDED',
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
                  value == FULFILLMENT_VALUE.SUCCEEDED &&
                  COLORS.planStepSuceeded,
                color: value == FULFILLMENT_VALUE.SUCCEEDED && COLORS.white,
                borderColor:
                  value != FULFILLMENT_VALUE.SUCCEEDED &&
                  COLORS.planStepSuceeded,
              }}
              value={FULFILLMENT_VALUE.SUCCEEDED}
              label={'Succeeded'}
              clickable={true}
              onClick={onChange}
              variant={
                value == FULFILLMENT_VALUE.SUCCEEDED ? 'default' : 'outlined'
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
      icon={
        <>
          {type == 'succeded' && <CheckIcon />}
          {type == 'failed' && <CloseIcon />}
        </>
      }
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
  defaultIcon: {
    backgroundColor: 'white',
  },
  outlinedIcon: {
    backgroundColor: 'transparent',
  },
}));

export default FullfilmentChipBarSelect;
