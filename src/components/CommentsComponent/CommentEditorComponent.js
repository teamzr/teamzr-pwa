import { Box, Button, Grid, TextField } from '@material-ui/core';
import * as React from 'react';

export default function CommentEditorComponent(props) {
  const [isMultiline, setIsMultiline] = React.useState(false);
  const toggleMultiline = () => {
    setIsMultiline(!isMultiline);
  };

  const [value, setValue] = React.useState('');

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid container spacing={1} direction={'column'}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          value={value}
          onChange={handleOnChange}
          placeholder={'Your comment'}
          variant={'filled'}
          multiline
          minRows={isMultiline && 3}
          onFocusCapture={toggleMultiline}
          onBlurCapture={toggleMultiline}
        />
      </Grid>
      {isMultiline && (
        <Grid item xs={12}>
          <Button
            style={{ float: 'right' }}
            color={'primary'}
            variant={'contained'}
            children={'Submit'}
          />
        </Grid>
      )}
    </Grid>
  );
}
