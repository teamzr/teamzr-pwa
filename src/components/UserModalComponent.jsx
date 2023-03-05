import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  useTheme,
} from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';

import UserSearchListComponent from './UserSearchListComponent/UserSearchListComponent';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function UserModalComponent(props) {
  const { open, title } = props;

  const [value, setValue] = React.useState(0);

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <TabContext>
      <Dialog open={open} fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0} dir={theme.direction}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
          </Box>
        </DialogContent>
      </Dialog>
    </TabContext>
  );
}
