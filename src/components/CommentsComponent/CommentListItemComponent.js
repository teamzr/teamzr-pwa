import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import * as React from 'react';

export default function CommentListItemComponent({ username, text }) {
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
            <Grid container direction={'row'} spacing={1}>
              <Grid item>
                <Avatar />
              </Grid>
              <Grid item>
                <Typography variant={'subtitle1'}>{username}</Typography>
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
