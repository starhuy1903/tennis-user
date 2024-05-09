import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';

import AllTournaments from './AllTournaments';
import ManageTournaments from './ManageTournament';
import MyTournaments from './MyTournaments';

export default function TournamentService() {
  const [currentTab, setCurrentTab] = useState('1');

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={handleChangeTab}
          aria-label="lab API tabs example"
          variant="fullWidth"
        >
          <Tab
            label="All Tournaments"
            value="1"
          />
          <Tab
            label="My Tournaments"
            value="2"
          />
          <Tab
            label="Manage Tournaments"
            value="3"
          />
        </TabList>
      </Box>
      <TabPanel value="1">
        <AllTournaments />
      </TabPanel>
      <TabPanel value="2">
        <MyTournaments />
      </TabPanel>
      <TabPanel value="3">
        <ManageTournaments />
      </TabPanel>
    </TabContext>
  );
}
