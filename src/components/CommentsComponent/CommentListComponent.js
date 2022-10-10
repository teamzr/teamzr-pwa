import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import * as React from 'react';
import CommentListItemComponent from './CommentListItemComponent';

// TODO: Add CommentList adapter component
export default function CommentListComponent({ loading, comments }) {
  return (
    <Box>
      {loading && (
        <Grid container spacing={1} direction={'column'}>
          <Grid item>
            <Skeleton variant={'rect'} width={'100%'} height={40} />
          </Grid>
          <Grid item>
            <Skeleton variant={'rect'} width={'100%'} height={40} />
          </Grid>
          <Grid item>
            <Skeleton variant={'rect'} width={'100%'} height={40} />
          </Grid>
          <Grid item>
            <Skeleton variant={'rect'} width={'100%'} height={40} />
          </Grid>
        </Grid>
      )}
      {!loading &&
        comments?.map((v) => (
          <CommentListItemComponent
            key={v.id}
            username={v.author.name}
            text={v.text}
            createdAt={v.createdAt}
          />
        ))}
    </Box>
  );
}
