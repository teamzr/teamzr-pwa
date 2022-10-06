import { Box } from '@material-ui/core';
import * as React from 'react';
import CommentListItemComponent from './CommentListItemComponent';

const data = [
  { user: { name: 'john' }, text: 'sds sd sd sdds' },
  { user: { name: 'john' }, text: 'sds sd sd sdds' },
];
// TODO: Add CommentList adapter component
export default function CommentListComponent(props) {
  return (
    <Box>
      {data.map((v) => (
        <CommentListItemComponent username={v.user.name} text={v.text} />
      ))}
    </Box>
  );
}
