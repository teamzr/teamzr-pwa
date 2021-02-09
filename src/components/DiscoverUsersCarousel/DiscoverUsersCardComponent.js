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

function DiscoverUsersCardComponent({ name, text }) {
  const classes = useDiscoverUsersCardStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant={'h5'} color={'secondary'}>
          {name}
        </Typography>
        <Typography color={'secondary'}>
          orem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </Typography>
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
    height: 150,
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
