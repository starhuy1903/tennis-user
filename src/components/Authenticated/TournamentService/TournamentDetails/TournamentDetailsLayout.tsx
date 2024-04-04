import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Chip, Paper, Stack, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { TournamentStatus } from 'constants/tournament';
import { useLazyGetTournamentDetailsQuery } from 'store/api/tournament/tournamentApiSlice';
import { Tournament } from 'types/tournament';
import { displayDateRange } from 'utils/datetime';
import { showError } from 'utils/toast';

const TournamentStatusChip = {
  [TournamentStatus.UPCOMING]: {
    displayText: 'Upcoming',
    chipColor: 'warning',
  },
  [TournamentStatus.ON_GOING]: {
    displayText: 'On Going',
    chipColor: 'success',
  },
  [TournamentStatus.COMPLETED]: {
    displayText: 'Completed',
    chipColor: 'success',
  },
};

const TournamentTabs = [
  {
    label: 'Participants',
    value: 'participants',
  },
  {
    label: 'Fixtures',
    value: 'fixtures',
  },
  {
    label: 'Information',
    value: 'info',
  },
];

export default function TournamentDetailsLayout() {
  const navigate = useNavigate();
  const [getTournamentDetails, { isLoading }] = useLazyGetTournamentDetailsQuery();
  const [tournamentData, setTournamentData] = useState<Tournament | null>(null);

  const [currentTab, setCurrentTab] = useState(TournamentTabs[0].value);

  const { tournamentId } = useParams();

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(`/tournaments/${tournamentId}/${newValue}`);
  };

  useEffect(() => {
    (async () => {
      if (tournamentId) {
        try {
          const res = await getTournamentDetails(parseInt(tournamentId)).unwrap();
          setTournamentData(res);
        } catch (error) {
          showError('Tournament not found.');
          navigate('/tournaments');
        }
      } else {
        showError('Tournament not found.');
        navigate('/tournaments');
      }
    })();
  }, [getTournamentDetails, navigate, tournamentId]);

  useEffect(() => {
    navigate(`/tournaments/${tournamentId}/participants`);
  }, []);

  if (isLoading || !tournamentData) {
    return <CenterLoading />;
  }

  return (
    <Box>
      <Paper sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, border: '1px white solid' }}>
        <img
          style={{ width: '100%', height: 300, objectFit: 'cover' }}
          src={tournamentData.imageUrl}
          alt="tournament image"
        />
        <Box p={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Stack>
              <Typography variant="h6">{tournamentData.name}</Typography>
              <Chip
                sx={{ width: 'fit-content' }}
                component="span"
                variant="outlined"
                color={TournamentStatusChip[tournamentData.status].chipColor}
                size="small"
                label={TournamentStatusChip[tournamentData.status].displayText}
              />
            </Stack>
            <Typography variant="subtitle1">
              {displayDateRange(tournamentData.startDate, tournamentData.endDate)}
            </Typography>
          </Stack>

          <TabContext value={currentTab}>
            <Box sx={{ mt: 2 }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
                variant="fullWidth"
              >
                {TournamentTabs.map((tab) => {
                  return (
                    <Tab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                    />
                  );
                })}
              </TabList>
            </Box>
          </TabContext>
        </Box>
      </Paper>
      <Outlet />
    </Box>
  );
}
