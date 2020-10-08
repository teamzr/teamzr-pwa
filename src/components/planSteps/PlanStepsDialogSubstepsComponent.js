import * as React from 'react';
import propTypes from 'prop-types';
import { Grid, IconButton, Input } from '@material-ui/core';
import { AddStepIcon, PlusIcon, RemoveCircleIcon } from '../../constants/Icons';
import { subSeconds } from 'date-fns';

function PlanStepsDialogSubstepsComponent(props) {
  const [substeps, setSubSteps] = React.useState([]);
  const newSubstepRef = React.useRef();

  const handleAddSubstep = React.useCallback(() => {
    setSubSteps([...substeps, newSubstepRef.current.value]);
    newSubstepRef.current.value = '';
  }, [newSubstepRef.current, substeps, setSubSteps]);

  const handleRemoveSubstep = React.useCallback(
    (i) => {
      substeps.splice(i, 1);
      setSubSteps([...substeps]);
    },
    [substeps, setSubSteps]
  );

  return (
    <Grid container spacing={1}>
      {substeps.map((step, i) => (
        <Grid item key={i} xs={12}>
          <Grid container direction={'row'}>
            <Grid item xs={1}>
              <IconButton onClick={() => handleRemoveSubstep(i)}>
                <RemoveCircleIcon />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <Input fullWidth value={step} />
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Grid container direction={'row'}>
          <Grid item xs={1}>
            <IconButton onClick={handleAddSubstep}>
              <AddStepIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <Input
              inputRef={newSubstepRef}
              fullWidth
              placeholder={'Add substep'}
              onSubmit={handleAddSubstep}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PlanStepsDialogSubstepsComponent;
