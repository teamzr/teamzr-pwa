import * as React from 'react';
import { Box } from '@material-ui/core';
import CommentEditorComponent from './CommentEditorComponent';
import CommentListComponent from './CommentListComponent';

export default function CommentsComponent(props) {
  const { onSubmit, comments, loading } = props;

  return (
    <>
      <Box>
        <h3>Activity</h3>
      </Box>
      <Box marginBottom={1}>
        <CommentEditorComponent onSubmit={onSubmit} />
      </Box>
      <Box>
        <CommentListComponent
          comments={comments}
          loading={loading}
          onSubmit={onSubmit}
        />
      </Box>
    </>
  );
}
