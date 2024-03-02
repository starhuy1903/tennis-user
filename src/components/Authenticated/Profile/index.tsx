import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import TabPanel from 'components/Common/TabPanel';
import { a11yProps } from 'utils/ui';

import AccountSettings from './AccountSettings';

const ProfileTabs = [
  {
    index: 0,
    label: 'Feeds',
    component: <Typography>Feeds</Typography>,
  },
  {
    index: 1,
    label: 'Payments',
    component: <Typography>Payments</Typography>,
  },
  {
    index: 2,
    label: 'Account Settings',
    component: <AccountSettings />,
  },
];

export default function Profile() {
  const [currentTab, setCurrentTab] = useState(ProfileTabs[0].index);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="Profile tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {ProfileTabs.map((tab) => (
            <Tab
              label={tab.label}
              {...a11yProps(tab.index)}
            />
          ))}
        </Tabs>
      </Box>
      {ProfileTabs.map((tab) => (
        <TabPanel
          value={currentTab}
          index={tab.index}
        >
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}
