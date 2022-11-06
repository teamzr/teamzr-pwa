import { Box, Button, Grid, TextField } from '@material-ui/core';
import * as React from 'react';

export default function CommentEditorComponent({ onSubmit, onCancelClick }) {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
  };

  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

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
          minRows={3}
        />
      </Grid>
      {
        <Grid item xs={12}>
          <Button
            buttonRef={inputRef}
            style={{ float: 'right' }}
            color={'primary'}
            variant={'contained'}
            children={'Submit'}
            onClick={handleSubmit}
          />
          {!!onCancelClick && (
            <Button
              style={{ float: 'right' }}
              color={'primary'}
              variant={'outlined'}
              children={'Cancel'}
              onClick={onCancelClick}
            />
          )}
        </Grid>
      }
    </Grid>
  );
}
