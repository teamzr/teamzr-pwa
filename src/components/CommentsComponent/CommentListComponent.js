import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import * as React from 'react';
import CommentEditorComponent from './CommentEditorComponent';
import CommentListItemComponent from './CommentListItemComponent';

// TODO: Add CommentList adapter component
export default function CommentListComponent({ loading, comments, onSubmit }) {
  console.log(comments);
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
          <>
            <CommentListItemComponent
              key={v.id}
              commentId={v.id}
              avatar={v.author?.avatar}
              username={v.author?.name}
              text={v.text}
              createdAt={v.createdAt}
              onSubmit={onSubmit}
            />
            <Box marginLeft={4}>
              {v.children.map((child, index) => (
                <>
                  <CommentListItemComponent
                    key={child.id}
                    commentId={child.id}
                    avatar={child.author?.avatar}
                    username={child.author?.name}
                    text={child.text}
                    createdAt={child.createdAt}
                    onSubmit={onSubmit}
                    disableReply={true}
                  />
                  {index >= v.children?.length - 1 && (
                    <CommentEditorComponent
                      onSubmit={(value) => onSubmit(value, v.id)}
                    />
                  )}
                </>
              ))}
            </Box>
          </>
        ))}
    </Box>
  );
}
