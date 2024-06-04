import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import { useGetCreatedTournamentsQuery } from 'store/api/tournament/creator/general';

import AllTournaments from './AllTournaments';
import ManageTournaments from './ManageTournament';
import MyTournaments from './MyTournaments';

export default function TournamentService() {
  const [currentTab, setCurrentTab] = useState('1');

  const { data: tournaments, isLoading } = useGetCreatedTournamentsQuery();
  const shouldShowManageTournamentTab = tournaments && tournaments.length > 0;

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <>
      <Breadcrumbs />

      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChangeTab}
            aria-label="Tournament tabs"
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
            {shouldShowManageTournamentTab && (
              <Tab
                label="Manage Tournaments"
                value="3"
              />
            )}
          </TabList>
        </Box>
        <TabPanel value="1">
          <AllTournaments />
        </TabPanel>
        <TabPanel value="2">
          <MyTournaments />
        </TabPanel>
        {shouldShowManageTournamentTab && (
          <TabPanel value="3">
            <ManageTournaments tournaments={tournaments} />
          </TabPanel>
        )}
      </TabContext>
    </>
  );
}
