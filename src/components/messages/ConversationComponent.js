import * as React from 'react';
import propTypes from 'prop-types';
import {
  Box,
  Avatar,
  Grid,
  Typography,
  makeStyles,
  Badge,
  Tooltip,
} from '@material-ui/core';
import moment from 'moment';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
import useAuthContext from '../../context/AuthContext';
import { AvatarGroup } from '@material-ui/lab';

function ConversationComponent(props) {
  const { id, name, messageAt, messages, users, read } = props;
  const isGroup = users.length > 1;
  const classes = useConversationComponentStyle();
  const router = useRouter();
  const { conversationId } = router.query;
  const authContext = useAuthContext();

  const date = moment(moment(parseInt(messageAt))).format('DD.MM.YYYY');

  const handleClick = () => {
    router.push(`/messages?conversationId=${id}`, `/messages/${id}`);
  };

  const oppositeUser = users.find((user) => user?.id != authContext.user?.id);
  const conversationName = isGroup ? name : oppositeUser.name;
  return (
    <Box
      margin={2}
      onClick={handleClick}
      className={clsx(classes.conversationBox, {
        [classes.active]: conversationId === id,
        [classes.bold]: !read,
      })}
    >
      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        justify={'space-between'}
        spacing={2}
      >
        <Grid item xs={3}>
          {isGroup && (
            <AvatarGroup max={1} spacing={'small'}>
              {users?.map((user, key) => (
                <Tooltip key={key} title={user?.name}>
                  <Avatar
                    className={classes.avatarItemGroup}
                    alt={user?.name}
                    src={user?.avatar}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          )}
          {!isGroup && (
            <Avatar className={classes.avatar} src={oppositeUser.avatar} />
          )}
        </Grid>
        <Grid item xs={true}>
          <Typography variant={'subtitle1'}>{conversationName}</Typography>
          <Typography variant={'subtitle2'}>
            {messages[messages.length - 1] &&
              messages[messages.length - 1].text.substring(0, 10)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            direction={'row'}
            justify={'flex-end'}
            alignContent={'flex-end'}
            alignItems={'flex-end'}
          >
            <Grid item xs={12}>
              <Typography variant={'subtitle2'}>{date}</Typography>
            </Grid>
            <Grid item xs={12}>
              {!read && <ConversationsCircle />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

ConversationComponent.propTypes = {
  name: propTypes.string,
  messageAt: propTypes.string,
};

const useConversationComponentStyle = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  avatarItemGroup: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  conversationBox: {
    height: theme.spacing(10),
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
  bold: {
    '& *': {
      fontWeight: 'bold',
    },
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

    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
}));
