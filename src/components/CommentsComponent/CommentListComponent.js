import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';
import * as React from 'react';
import { COLORS } from '../../constants/Colors';
import FullfilmentChipBarSelect, {
  ChipBarItem,
  FULFILLMENT_VALUE,
} from '../planStepDetail/FullfilmentChipBarSelect';
import CommentEditorComponent from './CommentEditorComponent';
import CommentListItemComponent from './CommentListItemComponent';

// TODO: Add CommentList adapter component
export default function CommentListComponent({ loading, comments, onSubmit }) {
  const [isReplying, setIsReplying] = React.useState(false);

  const handleReplyClick = (commentId) => {
    setIsReplying(commentId);
  };

  const handleCancelClick = () => {
    setIsReplying(false);
  };

  const handleSubmit = (value) => {
    onSubmit(value, isReplying);
    setIsReplying(false);
  };
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
            {v.fulfillment && (
              <Box
                style={{
                  marginTop: 40,
                  marginBottom: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1,
                  borderTopColor: COLORS.primaryMain,
                  borderTopWidth: 1,
                  borderTopStyle: 'solid',
                  paddingTop: 5,
                }}
              >
                <Box
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: '100%',
                    alignItems: 'center',
                    alignContent: 'center',
                    display: 'flex',
                    justifyItems: 'center',
                    justifyContent: 'center',
                    justifySelf: 'left',

                    background:
                      v.fulfillment.value == FULFILLMENT_VALUE.SUCCEEDED
                        ? COLORS.planStepSuceeded
                        : COLORS.planStepFailed,
                  }}
                >
                  <Avatar src={v.author?.avatar} />
                </Box>
                <Box style={{ flex: 4 }}>
                  <Typography variant={'caption'} style={{ margin: 12 }}>
                    {v.text}
                    
                  </Typography>
                  <FullfilmentChipBarSelect  />
                </Box>
                <Box>
                  {' '}
                  {moment(moment(parseInt(v.createdAt)), 'DD.MM.YYYY').fromNow(
                    true
                  )}
                </Box>
              </Box>
            )}
            {!v.fulfillment && (
              <CommentListItemComponent
                key={v.id}
                commentId={v.id}
                avatar={v.author?.avatar}
                username={v.author?.name}
                text={v.text}
                createdAt={v.createdAt}
                onSubmit={onSubmit}
                handleReplyClick={handleReplyClick}
              />
            )}
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
                </>
              ))}
            </Box>
            <CommentListComponentChildReplyBtn
              onSubmit={handleSubmit}
              parent={v.id}
              isReplying={isReplying}
              setIsReplying={setIsReplying}
            />
          </>
        ))}
    </Box>
  );
}

const CommentListComponentChildReplyBtn = ({
  parent,
  isReplying,
  onSubmit,
  setIsReplying,
}) => {
  const handleSubmit = (value) => {
    onSubmit(value, parent);
  };

  return (
    <>
      {!isReplying && (
        <Button variant={'outlined'} onClick={() => setIsReplying(parent)}>
          Reply
        </Button>
      )}
      {parent == isReplying && (
        <CommentEditorComponent
          onSubmit={handleSubmit}
          onCancelClick={() => setIsReplying(false)}
        />
      )}
    </>
  );
};
