import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Paper, Stack, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
// import { TournamentStatus } from 'constants/tournament';
import { useLazyGetGroupTournamentDetailsQuery } from 'store/api/group/groupTournamentApiSlice';
import { GroupTournament } from 'types/tournament';
import { displayDateRange } from 'utils/datetime';
import { showError } from 'utils/toast';

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

export default function GroupTournamentDetailsLayout() {
  const navigate = useNavigate();
  const [getTournamentDetails, { isLoading }] = useLazyGetGroupTournamentDetailsQuery();
  const [tournamentData, setTournamentData] = useState<GroupTournament | null>(null);

  const [currentTab, setCurrentTab] = useState(GroupTournamentTabs[0].value);

  const { groupId, tournamentId } = useParams();

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(`/groups/${groupId}/tournaments/${tournamentId}/${newValue}`);
  };

  useEffect(() => {
    (async () => {
      if (tournamentId && groupId) {
        try {
          const res = await getTournamentDetails({
            groupId: parseInt(groupId),
            tournamentId: parseInt(tournamentId),
          }).unwrap();

          setTournamentData(res);
        } catch (error) {
          showError('Group tournament not found.');
          navigate(`/groups/${groupId}`);
        }
      } else {
        showError('Group tournament not found.');
        navigate(`/groups/${groupId}`);
      }
    })();
  }, [getTournamentDetails, groupId, navigate, tournamentId]);

  useEffect(() => {
    navigate(`groups/${groupId}/tournaments/${tournamentId}/participants`);
  }, [groupId, navigate, tournamentId]);

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
            </Box>
          </TabContext>
        </Box>
      </Paper>
      <Outlet />
    </Box>
  );
}
