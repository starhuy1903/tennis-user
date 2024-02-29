import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    'id': `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const AccountSettingTabs = [
  {
    index: 0,
    label: 'Basic Information',
    component: <Typography>Basic Information</Typography>,
  },
  {
    index: 1,
    label: 'Change Password',
    component: <Typography>Change Password</Typography>,
  },
];

export default function AccountSettings() {
  const [currentTab, setCurrentTab] = useState(AccountSettingTabs[0].index);

  const handleChange = (_: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
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
