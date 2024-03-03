import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

import TabPanel from 'components/Common/TabPanel';
import { a11yProps } from 'utils/ui';

import Feeds from './Feeds';
import Information from './Information';
import Member from './Member';

const GroupTabs = [
  {
    index: 0,
    label: 'Feeds',
    component: <Feeds />,
  },
  {
    index: 1,
    label: 'Members',
    component: <Member />,
  },
  {
    index: 2,
    label: 'Information',
    component: <Information />,
  },
];

export default function GroupDetail() {
  const [currentTab, setCurrentTab] = useState(GroupTabs[0].index);

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
          {GroupTabs.map((tab) => (
            <Tab
              key={tab.index}
              label={tab.label}
              {...a11yProps(tab.index)}
            />
          ))}
        </Tabs>
      </Box>
      {GroupTabs.map((tab) => (
        <TabPanel
          key={tab.index}
          value={currentTab}
          index={tab.index}
        >
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
}
