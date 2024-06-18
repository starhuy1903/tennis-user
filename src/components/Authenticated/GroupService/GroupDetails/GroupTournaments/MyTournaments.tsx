import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { TournamentStatus } from 'constants/tournament';
import { useLazyGetMyGroupTournamentsQuery } from 'store/api/group/groupTournamentApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { GroupTournament } from 'types/tournament';

import GroupTournamentList from './GroupTournamentList';

export default function MyTournaments() {
  const groupData = useAppSelector(selectGroup);

  const [tournaments, setTournaments] = useState<{
    upcoming: GroupTournament[];
    onGoing: GroupTournament[];
    completed: GroupTournament[];
  }>({
    upcoming: [],
    onGoing: [],
    completed: [],
  });

  const [getTournaments, { isLoading }] = useLazyGetMyGroupTournamentsQuery();

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          getTournaments({ tournamentStatus: TournamentStatus.UPCOMING, groupId: groupData.id }, true).unwrap(), // Cache to avoid multiple requests
          getTournaments({ tournamentStatus: TournamentStatus.ON_GOING, groupId: groupData.id }, true).unwrap(),
          getTournaments({ tournamentStatus: TournamentStatus.COMPLETED, groupId: groupData.id }, true).unwrap(),
        ]);
        setTournaments({
          upcoming: responses[0],
          onGoing: responses[1],
          completed: responses[2],
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getTournaments, groupData.id]);

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Stack gap={4}>
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <EmojiEventsIcon
            sx={{
              color: '#FF8A08',
            }}
          />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            My Registered Tournaments
          </Typography>
        </Stack>

        <GroupTournamentList tournaments={tournaments.upcoming} />
      </Box>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <LocalFireDepartmentIcon
            sx={{
              color: '#F08A5D',
            }}
          />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            My Ongoing Tournaments
          </Typography>
        </Stack>

        <GroupTournamentList tournaments={tournaments.onGoing} />
      </Box>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <WorkspacePremiumIcon
            sx={{
              color: '#FF2E63',
            }}
          />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            My Completed Tournaments
          </Typography>
        </Stack>

        {tournaments.completed && tournaments.completed.length !== 0 ? (
          <GroupTournamentList tournaments={tournaments.completed} />
        ) : (
          <NoData message="You have not participated in any tournaments yet." />
        )}
      </Box>
    </Stack>
  );
}
