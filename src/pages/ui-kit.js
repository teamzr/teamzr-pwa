import * as React from 'react';
import { Grid, Container, Box, Typography } from '@material-ui/core';
import ChipSelectComponent from '../components/ChipSelectComponent/ChipSelectComponent';
import UserSelectModalUIKitItem from '../components/UIKitItems/UserSelectModalUIKitItem';
import AlertDialogUIKitItem from '../components/UIKitItems/AlertDialogUIKitItem';
import CommentsUIKitItem from '../components/UIKitItems/CommentsUIKitItem';
import UserMultiselectComponentUiKitItem from '../components/UIKitItems/UserMultiSelectComponentUIKitItem';
import { UserModalComponent } from '../components/UserModalComponent';

function UiKit() {
  return (
    <div>
      <Container maxWidth={'md'}>
        <Grid container alignContent={'center'}>
          {false && (
            <Grid item>
              <Typography variant={'h6'}>ChipsetSelect</Typography>
              <ChipSelect />
            </Grid>
          )}
          {false && <UserSelectModalUIKitItem />}
          {false && <AlertDialogUIKitItem />}
          {false && <CommentsUIKitItem />}
          {false && <UserMultiselectComponentUiKitItem />}
          <UserModalComponent open={true} title={'Users'} />
        </Grid>
      </Container>
    </div>
  );
}

const ChipSelect = () => {
  const [value, setValue] = React.useState(1);

  const options = [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
    { value: 3, label: 'Third' },
    { value: 4, label: 'Fourth' },
    { value: 5, label: 'Fifth' },
    { value: 6, label: 'Sixth' },
  ];
  const onChange = (value) => {
    setValue(value);
  };
  return (
    <div style={{ width: '200px' }}>
      <ChipSelectComponent
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default UiKit;
