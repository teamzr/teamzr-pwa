import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';
import CommentEditorComponent from './CommentEditorComponent';

export default function CommentListItemComponent({
  commentId,
  username,
  text,
  createdAt,
  avatar,
  disableReply,
  handleReplyClick,
}) {
  const theme = useTheme();

  const onReplyClick = () => {
    handleReplyClick(commentId);
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: '#fff',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '5px',
          marginBottom: '0.5em',
        }}
        padding={1}
      >
        <CardContent>
          <Grid
            container
            direction={'column'}
            spacing={1}
            alignContent={'left'}
          >
            <Grid item xs={'auto'}>
              <Grid
                container
                direction={'row'}
                spacing={1}
                alignContent={'right'}
              >
                <Grid item xs={5}>
                  <Grid
                    container
                    spacing={1}
                    alignContent={'center'}
                    alignItems={'center'}
                  >
                    <Grid item>
                      <Avatar src={avatar} />
                    </Grid>
                    <Grid item>
                      <Typography variant={'subtitle1'}>{username}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={2} alignContent={'left'}>
                  <Typography variant={'caption'}>
                    {moment(moment(parseInt(createdAt)), 'DD.MM.YYYY').fromNow(
                      true
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={'auto'}>
              <Typography variant={'body2'}>{text}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignItems={'center'} alignContent={'center'}>
                {!disableReply && (
                  <Grid item>
                    <Button variant={'text'} onClick={onReplyClick}>
                      Reply
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
