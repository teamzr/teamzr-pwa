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

function ConversationComponent(props) {
  const { name, updatedAt, messages, users } = props;
  const classes = useConversationComponentStyle();

  const date = moment(moment(parseInt(updatedAt))).format('DD.MM.YYYY');

  const conversationName = users.length > 2 ? name : users[0].name;
  return (
    <Box margin={2}>
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
            {messages[0] && messages[0].text.substring(0, 10)}
          </Typography>
        </Grid>
        <Grid item xs={2} direction={'column'}>
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
