import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

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
    index: 2,
    label: 'Members',
    component: <Member />,
  },
  {
    index: 3,
    label: 'Information',
    component: <Information />,
  },
];

export default function GroupDetailLayout() {
  const navigate = useNavigate();
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
          aria-label="Group tabs"
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
      <Outlet />
    </Box>
  );
}
