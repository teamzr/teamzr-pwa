import * as React from 'react';
import propTypes from 'prop-types';
import {
  Box,
  Avatar,
  Grid,
  Typography,
  makeStyles,
  Badge,
} from '@material-ui/core';
import moment from 'moment';
import { useRouter } from 'next/router';
import { route } from 'next/dist/next-server/server/router';
import clsx from 'clsx';

function ConversationComponent(props) {
  const { id, name, updatedAt, messages, users } = props;
  const classes = useConversationComponentStyle();

  const router = useRouter();
  const { conversationId } = router.query;

  const date = moment(moment(parseInt(updatedAt))).format('DD.MM.YYYY');

  const handleClick = React.useCallback(() => {
    router.push(`/messages?conversationId=${id}`, `/messages/${id}`);
  }, [router, id]);

  const conversationName = users.length > 2 ? name : users[0].name;
  return (
    <Box
      margin={2}
      onClick={handleClick}
      className={clsx(classes.conversationBox, {
        [classes.active]: conversationId === id,
      })}
    >
      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        justify={'space-between'}
        spacing={2}
      >
        <Grid item xs={'auto'}>
          <Avatar className={classes.avatar} />
        </Grid>
        <Grid item xs={true}>
          <Typography variant={'subtitle1'}>{conversationName}</Typography>
          <Typography variant={'subtitle2'}>
            {messages[messages.length - 1] &&
              messages[messages.length - 1].text.substring(0, 10)}
          </Typography>
        </Grid>
        <Grid item xs={4} direction={'column'}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant={'subtitle2'}>{date}</Typography>
            </Grid>
            <Grid item xs={12}>
              <ConversationsCircle />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

ConversationComponent.propTypes = {
  name: propTypes.string,
};

const useConversationComponentStyle = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  conversationBox: {
    cursor: 'pointer',
    borderRadius: theme.spacing(2),
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.main,
    },
  },
  active: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
  },
}));

export default ConversationComponent;

const ConversationsCircle = (props) => {
  const classes = useConversationCircleStyle();
  return <div className={classes.circle}></div>;
};

const useConversationCircleStyle = makeStyles((theme) => ({
  circle: {
    display: 'block',
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    backgroundColor: theme.palette.other.primary,
  },
}));
