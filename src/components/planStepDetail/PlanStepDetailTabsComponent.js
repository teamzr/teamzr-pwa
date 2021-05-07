import * as React from 'react';
import proTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

function PlanStepDetailTabsComponent(props) {
  const { onChange } = props;
  return (
    <Tabs
      variant={'fullWidth'}
      value={0}
      indicatorColor={'primary'}
      textColor={'primary'}
      onChange={onChange}
    >
      <Tab label={'Settings'} active />
      <Tab label={'Progress'} />
      <Tab label={'Overview'} />
    </Tabs>
  );
}

export default PlanStepDetailTabsComponent;
