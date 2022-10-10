import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import moment from 'moment';
import * as React from 'react';

export default function CommentListItemComponent({
  username,
  text,
  createdAt,
}) {
  const theme = useTheme();
  return (
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
        <Grid container direction={'column'} spacing={1}>
          <Grid item xs={12}>
            <Grid
              container
              direction={'row'}
              spacing={1}
              alignContent={'right'}
            >
              <Grid item xs={3}>
                <Avatar />
              </Grid>
              <Grid item xs={7}>
                <Typography variant={'subtitle1'}>{username}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant={'caption'}>
                  {moment(moment(parseInt(createdAt)), 'DD.MM.YYYY').fromNow(
                    true
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant={'body2'}>{text}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
