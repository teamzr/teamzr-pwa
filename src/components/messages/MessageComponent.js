import * as React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import propTypes from 'prop-types';
import clsx from 'clsx';
import { COLORS } from '../../constants/Colors';

function MessageComponent(props) {
  const { authorName, text, fromMe, date } = props;
  const classes = useMessageComponentStyle();

  return (
    <Box
      className={clsx(classes.box, {
        [classes.fromMe]: fromMe,
        [classes.fromOthers]: !fromMe,
      })}
    >
      <Grid container direction={'column'} spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2} justify={'space-between'}>
            <Grid item>{authorName}</Grid>
            <Grid item>{date}</Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {text}
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
}

MessageComponent.propTypes = {
  text: propTypes.string,
  fromMe: propTypes.bool,
  authorName: propTypes.string,
};

const useMessageComponentStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  fromMe: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },
  fromOthers: {
    backgroundColor: COLORS.fromOthersMesageColor,
  },
}));

export default MessageComponent;
