import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Chip, Collapse, Container, Divider, IconButton, Paper, Stack, Tab, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

// import { TournamentStatus } from 'constants/tournament';
import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import Steps from 'components/Common/Steps';
import { TournamentPhaseOptions, defaultTournamentImage } from 'constants/tournament';
import { useLazyGetOpenTournamentDetailsQuery } from 'store/api/tournament/shared/general';
import {
  checkTournamentRole,
  selectTournament,
  setTournamentDetails,
  shouldRefreshTournamentData,
  showTournamentBackground,
} from 'store/slice/tournamentSlice';
import { displayDateRange } from 'utils/datetime';
import { getNextPhaseInString } from 'utils/tournament';

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
  const { pathname } = useLocation();
  const [getTournamentDetails, { isLoading }] = useLazyGetOpenTournamentDetailsQuery();
  const { data: tournamentData, shouldRefreshData, showBackground } = useAppSelector(selectTournament);
  const { isCreator } = useAppSelector(checkTournamentRole);

  const getActiveTab = useCallback(() => {
    const pathParts = pathname.split('/');
    const activeTabFromPath = pathParts[3]; // /tournaments/:tournamentId/:activeTab
    const activeTab = TournamentTabs.find((tab) => tab.value === activeTabFromPath);
    return activeTab ? activeTab.value : TournamentTabs[2].value; // default to info tab
  }, [pathname]);

  const [currentTab, setCurrentTab] = useState(getActiveTab);

  const { tournamentId } = useParams();

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(`/tournaments/${tournamentId}/${newValue}`);
  };

  useEffect(() => {
    setCurrentTab(getActiveTab);
  }, [getActiveTab]);

  useEffect(() => {
    (async () => {
      if (tournamentId) {
        if (shouldRefreshData) {
          try {
            const res = await getTournamentDetails(parseInt(tournamentId)).unwrap();
            dispatch(setTournamentDetails(res));
            dispatch(shouldRefreshTournamentData(false));
          } catch (error) {
            navigate('/tournaments');
          }
        }
      } else {
        navigate('/tournaments');
      }
    })();
  }, [getTournamentDetails, navigate, tournamentId, dispatch, shouldRefreshData]);

  useEffect(() => {
    return () => {
      dispatch(shouldRefreshTournamentData(true));
    };
  }, [dispatch]);

  const customRoutes = [
    {
      path: `/tournaments/:id`,
      breadcrumb: tournamentData.name,
    },
    {
      path: '/tournaments/:id/:tab',
      breadcrumb: null,
    },
  ];

  if (isLoading || tournamentData.id === 0) {
    return <CenterLoading />;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '120vh',
      }}
    >
      <Breadcrumbs customRoutes={customRoutes} />

      <Paper sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, border: '1px white solid' }}>
        <Box position="relative">
          <Collapse in={showBackground}>
            <img
              style={{ width: '100%', height: 300, objectFit: 'cover' }}
              src={tournamentData.image || defaultTournamentImage}
              alt="tournament image"
            />
          </Collapse>
          {showBackground && (
            <IconButton
              aria-label="collapse"
              sx={{
                'position': 'absolute',
                'left': '50%',
                'bottom': 0,
                'transform': 'translateX(-50%) translateY(-50%)',
                'backgroundColor': 'rgba(0, 0, 0, 0.5)',
                'color': 'white',

                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
              onClick={() => dispatch(showTournamentBackground(false))}
            >
              <KeyboardDoubleArrowUpIcon />
            </IconButton>
          )}
        </Box>

        <Collapse in={!showBackground}>
          <Box
            display="flex"
            justifyContent="center"
          >
            {!showBackground && (
              <IconButton
                aria-label="collapse"
                onClick={() => dispatch(showTournamentBackground(true))}
                sx={{
                  'mt': 2,
                  'backgroundColor': 'rgba(0, 0, 0, 0.5)',
                  'color': 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <KeyboardDoubleArrowDownIcon />
              </IconButton>
            )}
          </Box>
        </Collapse>

        <Box pt={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
            >
              <Typography variant="h6">{tournamentData.name}</Typography>
              {isCreator && (
                <Chip
                  sx={{ width: 'fit-content' }}
                  component="span"
                  variant="outlined"
                  color="error"
                  size="small"
                  label="Creator"
                />
              )}
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
              currentStep={
                TournamentPhaseOptions[
                  getNextPhaseInString(tournamentData.phase) as keyof typeof TournamentPhaseOptions
                ]
              }
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

      {/* <InformationSection /> */}

      <Outlet />
    </Container>
  );
}
