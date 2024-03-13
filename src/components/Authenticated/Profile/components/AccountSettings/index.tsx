import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import TabPanel from 'components/Common/TabPanel';
import { a11yProps } from 'utils/ui';

import ChangePassword from './ChangePassword';

const AccountSettingTabs = [
  {
    index: 0,
    label: 'Basic Information',
    component: <Typography>Basic Information</Typography>,
  },
  {
    index: 1,
    label: 'Change Password',
    component: <ChangePassword />,
  },
];

export default function AccountSettings() {
  const [currentTab, setCurrentTab] = useState(AccountSettingTabs[0].index);

  const handleChange = (_: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}>
      <Tabs
        orientation="vertical"
        value={currentTab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {AccountSettingTabs.map((tab) => (
          <Tab
            label={tab.label}
            {...a11yProps(tab.index)}
          />
        ))}
      </Tabs>
      {AccountSettingTabs.map((tab) => (
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
