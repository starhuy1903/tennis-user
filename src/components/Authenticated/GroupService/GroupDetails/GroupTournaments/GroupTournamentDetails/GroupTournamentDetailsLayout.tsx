import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Chip, Collapse, Divider, IconButton, Paper, Stack, Tab, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import Steps from 'components/Common/Steps';
import { GroupTournamentPhaseOptions } from 'constants/group-tournament';
import { defaultTournamentImage } from 'constants/tournament';
import { useLazyGetGroupTournamentDetailsQuery } from 'store/api/group/group-tournaments/shared/general';
import { useLazyGetGroupDetailsQuery } from 'store/api/group/groupApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import {
  selectGroupTournament,
  setGroupTournamentDetails,
  shouldRefreshGroupTournamentData,
  showGroupTournamentBackground,
} from 'store/slice/groupTournamentSlice';
import { displayDateRange } from 'utils/datetime';
import { getNextPhaseInString } from 'utils/group-tournament';

const GroupTournamentTabs = [
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

const steps = Object.values(GroupTournamentPhaseOptions);

export default function GroupTournamentDetailsLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const groupData = useAppSelector(selectGroup);
  const [getGroupTournamentDetails, { isLoading }] = useLazyGetGroupTournamentDetailsQuery();
  const { data: tournamentData, shouldRefreshData, showBackground } = useAppSelector(selectGroupTournament);
  const [getGroupDetails, { isLoading: fetchingGroupDetails }] = useLazyGetGroupDetailsQuery();

  const getActiveTab = useCallback(() => {
    const pathParts = pathname.split('/');
    const activeTabFromPath = pathParts[5];
    const activeTab = GroupTournamentTabs.find((tab) => tab.value === activeTabFromPath);
    return activeTab ? activeTab.value : GroupTournamentTabs[2].value;
  }, [pathname]);

  const [currentTab, setCurrentTab] = useState(getActiveTab);

  const { groupId, tournamentId } = useParams();

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(`/groups/${groupData.id}/tournaments/${tournamentId}/${newValue}`);
  };

  useEffect(() => {
    setCurrentTab(getActiveTab);
  }, [getActiveTab]);

  useEffect(() => {
    (async () => {
      if (!groupId) {
        navigate('/groups');
        return;
      }

      if (groupData.id === 0) {
        try {
          await getGroupDetails(parseInt(groupId));
          return;
        } catch (error) {
          navigate('/groups');
          return;
        }
      }

      if (tournamentId) {
        if (shouldRefreshData) {
          try {
            const res = await getGroupTournamentDetails({
              groupId: groupData.id,
              tournamentId: parseInt(tournamentId),
            }).unwrap();
            dispatch(setGroupTournamentDetails(res));
            dispatch(shouldRefreshGroupTournamentData(false));
          } catch (error) {
            navigate(`/groups/${groupData.id}/tournaments`);
          }
        }
      } else {
        navigate(`/groups/${groupData.id}/tournaments`);
      }
    })();
  }, [
    dispatch,
    getGroupDetails,
    getGroupTournamentDetails,
    groupData.id,
    groupId,
    navigate,
    shouldRefreshData,
    tournamentId,
  ]);

  useEffect(() => {
    return () => {
      dispatch(shouldRefreshGroupTournamentData(true));
    };
  }, [dispatch]);

  const customRoutes = useMemo(
    () => [
      {
        path: `/groups/:id`,
        breadcrumb: groupData.name,
      },
      {
        path: `/groups/:id/tournaments/:id`,
        breadcrumb: tournamentData.name,
      },
      {
        path: '/groups/:id/tournaments/:id/:tab',
        breadcrumb: null,
      },
    ],
    [groupData.name, tournamentData.name]
  );

  if (isLoading || fetchingGroupDetails || tournamentData.id === 0) {
    return <CenterLoading />;
  }

  return (
    <>
      <Breadcrumbs customRoutes={customRoutes} />

      <Paper sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, border: '1px white solid' }}>
        <Box position="relative">
          <Collapse in={showBackground}>
            <img
              style={{ width: '100%', height: 300, objectFit: 'cover' }}
              src={tournamentData.image || defaultTournamentImage}
              alt="group tournament image"
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
              onClick={() => dispatch(showGroupTournamentBackground(false))}
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
                onClick={() => dispatch(showGroupTournamentBackground(true))}
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
              {tournamentData.isCreator && (
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
                GroupTournamentPhaseOptions[
                  getNextPhaseInString(tournamentData.phase) as keyof typeof GroupTournamentPhaseOptions
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
                {GroupTournamentTabs.map((tab) => {
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
    </>
  );
}
