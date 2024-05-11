import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Paper, Stack, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { defaultTournamentImage } from 'constants/tournament';
// import { TournamentStatus } from 'constants/tournament';
import { useLazyGetOpenTournamentDetailsQuery } from 'store/api/tournament/tournamentApiSlice';
import { selectTournament, setTournamentDetails } from 'store/slice/tournamentSlice';
import { displayDateRange } from 'utils/datetime';

// const TournamentStatusChip = {
//   [TournamentStatus.UPCOMING]: {
//     displayText: 'Upcoming',
//     chipColor: 'warning',
//   },
//   [TournamentStatus.ON_GOING]: {
//     displayText: 'On Going',
//     chipColor: 'success',
//   },
//   [TournamentStatus.COMPLETED]: {
//     displayText: 'Completed',
//     chipColor: 'success',
//   },
// };

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
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const [getTournamentDetails, { isLoading }] = useLazyGetOpenTournamentDetailsQuery();
  const tournamentData = useAppSelector(selectTournament);

  const [currentTab, setCurrentTab] = useState(pathParts[pathParts.length - 1]);

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
          dispatch(setTournamentDetails(res));
        } catch (error) {
          navigate('/tournaments');
        }
      } else {
        navigate('/tournaments');
      }
    })();
  }, [getTournamentDetails, navigate, tournamentId, dispatch]);

  if (isLoading || tournamentData.id === 0) {
    return <CenterLoading />;
  }

  return (
    <Box>
      <Paper sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, border: '1px white solid' }}>
        <img
          style={{ width: '100%', height: 300, objectFit: 'cover' }}
          src={tournamentData.image || defaultTournamentImage}
          alt="tournament image"
        />
        <Box p={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Stack>
              <Typography variant="h6">{tournamentData.name}</Typography>
              {/* <Chip
                sx={{ width: 'fit-content' }}
                component="span"
                variant="outlined"
                color={TournamentStatusChip[tournamentData.status].chipColor}
                size="small"
                label={TournamentStatusChip[tournamentData.status].displayText}
              /> */}
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
