import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Container, Divider, Paper, Stack, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
// import { TournamentStatus } from 'constants/tournament';
import Steps from 'components/Common/Steps';
import { TournamentPhaseOptions, defaultTournamentImage } from 'constants/tournament';
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

const steps = Object.values(TournamentPhaseOptions);

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
    <Container maxWidth="lg">
      <Paper sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, border: '1px white solid' }}>
        <img
          style={{ width: '100%', height: 300, objectFit: 'cover' }}
          src={tournamentData.image || defaultTournamentImage}
          alt="tournament image"
        />

        <Box pt={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            px={2}
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

          <Box
            mb={2}
            mt={3}
          >
            <Steps
              currentStep={TournamentPhaseOptions[tournamentData.phase]}
              steps={steps}
            />
          </Box>

          <Divider
            sx={{
              my: 1,
            }}
          />

          <Box px={4}>
            <TabContext value={currentTab}>
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
            </TabContext>
          </Box>
        </Box>
      </Paper>

      <Outlet />
    </Container>
  );
}
