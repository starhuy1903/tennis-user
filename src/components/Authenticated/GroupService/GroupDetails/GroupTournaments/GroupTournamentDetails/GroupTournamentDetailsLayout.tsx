import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Paper, Stack, Tab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

// import { TournamentStatus } from 'constants/tournament';
import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetGroupTournamentDetailsQuery } from 'store/api/group/groupTournamentApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
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
  const groupData = useAppSelector(selectGroup);

  const [getTournamentDetails, { isLoading, data: tournamentData }] = useLazyGetGroupTournamentDetailsQuery();

  const [currentTab, setCurrentTab] = useState(GroupTournamentTabs[0].value);

  const { tournamentId } = useParams();

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
    navigate(`/groups/${groupData.id}/tournaments/${tournamentId}/${newValue}`);
  };

  useEffect(() => {
    (async () => {
      if (tournamentId) {
        try {
          await getTournamentDetails({
            groupId: groupData.id,
            tournamentId: parseInt(tournamentId),
          }).unwrap();
        } catch (error) {
          navigate(`/groups/${groupData.id}`);
        }
      } else {
        navigate(`/groups/${groupData.id}`);
      }
    })();
  }, [getTournamentDetails, groupData.id, navigate, tournamentId]);

  useEffect(() => {
    navigate(`groups/${groupData.id}/tournaments/${tournamentId}/participants`);
  }, [groupData.id, navigate, tournamentId]);

  if (isLoading || !tournamentData) {
    return <CenterLoading />;
  }

  return (
    <Box>
      <Breadcrumbs />

      <Paper sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, border: '1px white solid' }}>
        <img
          style={{ width: '100%', height: 300, objectFit: 'cover' }}
          src={tournamentData.image}
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
