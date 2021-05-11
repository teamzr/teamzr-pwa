import * as React from 'react';
import proTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

function PlanStepDetailTabsComponent(props) {
  const { onChange, tab } = props;
  return (
    <Tabs
      variant={'fullWidth'}
      value={tab}
      indicatorColor={'primary'}
      textColor={'primary'}
      onChange={onChange}
    >
      <Tab label={'Settings'} />
      <Tab label={'Progress'} />
      <Tab label={'Overview'} />
    </Tabs>
  );
}

export default PlanStepDetailTabsComponent;
