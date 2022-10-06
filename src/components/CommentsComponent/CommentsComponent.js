import { Box } from '@material-ui/core';
import * as React from 'react';
import CommentEditorComponent from './CommentEditorComponent';
import CommentListComponent from './CommentListComponent';

export default function CommentsComponent(props) {
  return (
    <>
      <Box>
        <h3>Comments</h3>
      </Box>
      <Box>
        <CommentListComponent />
      </Box>
      <Box>
        <CommentEditorComponent />
      </Box>
    </>
  );
}
