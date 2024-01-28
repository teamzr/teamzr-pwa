import * as React from 'react';
import proTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

function PlanStepDetailTabsComponent(props) {
  const { onChange, tab, disableProgressTab } = props;
  return (
    <Tabs
      variant={'fullWidth'}
      value={tab}
      indicatorColor={'primary'}
      textColor={'primary'}
      onChange={onChange}
    >
      <Tab label={'Detail'} />
      {disableProgressTab == false && (
        <Tab label={'Progress'} disabled={!!disableProgressTab} />
      )}

      <Tab label={'Overview'} />
    </Tabs>
  );
}

export default PlanStepDetailTabsComponent;
