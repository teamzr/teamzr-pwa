import * as React from 'react';
import propTypes from 'prop-types';

const PlanStepsDialogComponent = (props) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={dialogOpen}
      scroll={'body'}
      fullWidth={true}
      maxWidth={'xs'}
    >
      <DialogTitle>New Step</DialogTitle>
      <DialogContent>
        <Grid container direction={'column'}>
          <Grid item>
            <TextField
              fullWidth
              onChange={handleValueChange}
              label={'Step name'}
              name={'name'}
              onChange={handleValueChange}
              autoComplete={'off'}
              InputProps={{ autoComplete: 'off' }}
              inputProps={{ autoComplete: 'off' }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label={'Step description'}
              name={'description'}
              onChange={handleValueChange}
              autoComplete={'off'}
              InputProps={{ autoComplete: 'off' }}
              inputProps={{ autoComplete: 'off' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant={'outlined'} onClick={handleClose}>
          Cancel
        </Button>
        <Button variant={'contained'} color={'primary'} onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanStepsDialogComponent;
