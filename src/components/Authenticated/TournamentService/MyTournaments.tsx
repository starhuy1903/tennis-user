import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { TournamentStatus } from 'constants/tournament';
import { useLazyGetMyTournamentsQuery } from 'store/api/tournament/tournamentApiSlice';
import { OpenTournament } from 'types/tournament';

import TournamentList from './TournamentList';

export default function MyTournaments() {
  const [tournaments, setTournaments] = useState<{
    upcoming: OpenTournament[];
    onGoing: OpenTournament[];
    completed: OpenTournament[];
  }>({
    upcoming: [],
    onGoing: [],
    completed: [],
  });

  const [getTournaments, { isLoading }] = useLazyGetMyTournamentsQuery();

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          getTournaments(TournamentStatus.UPCOMING, true).unwrap(), // Cache to avoid multiple requests
          getTournaments(TournamentStatus.ON_GOING, true).unwrap(),
          getTournaments(TournamentStatus.COMPLETED, true).unwrap(),
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
  }, [getTournaments]);

  if (isLoading) {
    return <CenterLoading height="10vh" />;
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

        <TournamentList tournaments={tournaments.upcoming} />
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

        <TournamentList tournaments={tournaments.onGoing} />
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
          <TournamentList tournaments={tournaments.completed} />
        ) : (
          <NoData message="You have not participated in any tournaments yet." />
        )}
      </Box>
    </Stack>
  );
}
