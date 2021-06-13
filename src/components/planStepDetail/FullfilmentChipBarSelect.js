import { Button } from '@material-ui/core';
import { Chip, Grid, Typography, makeStyles, styled } from '@material-ui/core';
import { BorderColor } from '@material-ui/icons';
import clsx from 'clsx';
import * as React from 'react';

function FullfilmentChipBarSelect(props) {
  return (
    <Grid container direction={'column'}>
      <Grid item>
        <Typography>Subtask1</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <ChipBarItem
              variant={'outline'}
              label={'Failed'}
              clickable={true}
            />
          </Grid>
          <Grid item>
            <ChipBarItem
              variant={'outline'}
              label={'Succeeded'}
              clickable={true}
            />
          </Grid>
          <Grid item>
            <ChipBarItem
              color={'default'}
              variant={'contained'}
              label={'Not Rated'}
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
  const { label } = props;
  const classes = makeChipBarItemStyle();
  return (
    <Chip
      variant={'default'}
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
