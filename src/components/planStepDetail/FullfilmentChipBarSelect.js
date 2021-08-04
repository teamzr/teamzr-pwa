import * as React from 'react';
import { Button } from '@material-ui/core';
import { Chip, Grid, Typography, makeStyles, styled } from '@material-ui/core';
import { BorderColor } from '@material-ui/icons';
import clsx from 'clsx';
import { COLORS } from '../../constants/Colors';

const FULFILLMENT_VALUE = {
  FAILED: 'FAILED',
  SUCEEDED: 'SUCEEDED',
  NOT_RATED: 'NOT_RATED',
};

function FullfilmentChipBarSelect(props) {
  const { onChange, value } = props;

  return (
    <Grid container direction={'column'}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <ChipBarItem
              style={{
                background:
                  value == FULFILLMENT_VALUE.FAILED && COLORS.planStepFailed,
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
              style={{
                background:
                  value == FULFILLMENT_VALUE.SUCEEDED &&
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
          <Grid item>
            <ChipBarItem
              style={{
                background:
                  value == FULFILLMENT_VALUE.NOT_RATED &&
                  COLORS.planStepNotRated,
              }}
              value={FULFILLMENT_VALUE.NOT_RATED}
              variant={
                value == FULFILLMENT_VALUE.NOT_RATED ? 'default' : 'outlined'
              }
              color={'default'}
              label={'Not Rated'}
              onClick={onChange}
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

const ChipBarItem = (props) => {
  const { variant, label, value, onClick, style } = props;
  const classes = makeChipBarItemStyle();

  const handleClick = () => {
    onClick(value);
  };
  return (
    <Chip
      style={style}
      onClick={handleClick}
      variant={variant}
      classes={{
        colorPrimary: clsx({
          [classes.failed]: false,
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
    borderColor: 'red',
    color: 'red',
    background: 'red',
  },
}));

export default FullfilmentChipBarSelect;
