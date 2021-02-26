import * as React from 'react';
import propTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';

function DiscoverUsersCardComponent({ name, description }) {
  const classes = useDiscoverUsersCardStyles();
  return (
    <Card className={classes.root} elevation={3}>
      <CardContent className={classes.content}>
        <Typography variant={'h5'} color={'secondary'}>
          {name}
        </Typography>
        <Typography color={'secondary'}>{description}</Typography>
      </CardContent>
      <CardMedia
        className={classes.cover}
        image={`https://randomuser.me/api/portraits/${
          Math.random() < 0.5 ? 'men' : 'men'
        }/${Math.ceil(Math.random() * 100)}.jpg`}
      />
    </Card>
  );
}

const useDiscoverUsersCardStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 300,
    height: 200,
    background: theme.palette.primary.main,
  },
  content: {
    flex: '1 0 auto',
    width: 159,
  },
  cover: {
    width: 151,
  },
}));

export default DiscoverUsersCardComponent;
