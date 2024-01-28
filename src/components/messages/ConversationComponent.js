import * as React from 'react';
import propTypes from 'prop-types';
import {
  Box,
  Avatar,
  Grid,
  Typography,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import moment from 'moment';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useAuthContext from '../../context/AuthContext';
import { AvatarGroup } from '@material-ui/lab';

function ConversationComponent(props) {
  const { id, name, messageAt, messages, users, read, type } = props;
  const isGroup = type != 'DIRECT';
  const classes = useConversationComponentStyle();
  const router = useRouter();
  const { conversationId } = router.query;
  const authContext = useAuthContext();

  const atDate = parseInt(messageAt);

  const date =
    Date.now() - atDate > 600000000
      ? moment(moment(atDate)).format('DD.MM.YYYY')
      : moment(moment(atDate), 'DD.MM.YYYY').fromNow(true);

  const handleClick = () => {
    router.push(`/messages?conversationId=${id}`, `/messages/${id}`);
  };

  const oppositeUser = users.find((user) => user?.id != authContext.user?.id);
  const conversationName = isGroup ? name : oppositeUser?.name;
  const [lastMessage, setLastMessage] = React.useState('');
  React.useEffect(() => {
    const textLength = messages[messages.length - 1]?.text?.length;

    const newm =
      messages[messages.length - 1] &&
      messages[messages.length - 1].text.substring(
        0,
        textLength < 30 ? textLength - 1 : 70
      );
    if (lastMessage != newm) {
      setLastMessage(newm);
    }
  }, [messages]);

  return (
    <Box
      margin={2}
      onClick={handleClick}
      className={clsx(classes.conversationBox, {
        [classes.active]: conversationId === id,
        [classes.bold]: !read,
      })}
    >
      <Box
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '56%',
          textAlign: 'right',
        }}
      >
        <Grid
          container
          direction={'row'}
          justify={'flex-end'}
          alignContent={'center'}
          alignItems={'center'}
        >
          <Grid item xs={10}>
            <Box margin={'2px'}>
              <Typography variant={'subtitle2'} style={{ fontSize: '10px' }}>
                {date}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            {!read && <ConversationsCircle />}
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        alignContent={'center'}
        justify={'space-between'}
        spacing={2}
      >
        <Grid item xs={4}>
          <Box width={'fit-content'} style={{ margin: 'auto' }}>
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
              <Avatar className={classes.avatar} src={oppositeUser?.avatar} />
            )}
          </Box>
        </Grid>
        <Grid item xs={8} style={{overflow: "hidden", maxHeight: 80}}>
          <Typography variant={'subtitle1'}>{conversationName}</Typography>
          <Typography variant={'subtitle2'} style={{ opacity: 0.7}}>{lastMessage}</Typography>
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
    position: 'relative',
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
