import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetTournamentsQuery } from 'store/api/tournamentApiSlice';
import { Tournament, TournamentStatus } from 'types/tournament';

import TournamentList from './TournamentList';

export default function TournamentService() {
  const groupInfo = useAppSelector((state) => state.group);
  const { canCreateTournament } = useAppSelector((state) => state.user.actions);

  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState<{
    upcoming: Tournament[];
    onGoing: Tournament[];
    completed: Tournament[];
  }>({
    upcoming: [],
    onGoing: [],
    completed: [],
  });

  const [getTournaments, { isLoading }] = useLazyGetTournamentsQuery();

  useEffect(() => {
    (async () => {
      if (groupInfo.id) {
        try {
          const responses = await Promise.all([
            getTournaments({ groupId: groupInfo.id, tournamentStatus: TournamentStatus.UPCOMING }).unwrap(),
            getTournaments({ groupId: groupInfo.id, tournamentStatus: TournamentStatus.ON_GOING }).unwrap(),
            getTournaments({ groupId: groupInfo.id, tournamentStatus: TournamentStatus.COMPLETED }).unwrap(),
          ]);
          setTournaments({
            upcoming: responses[0],
            onGoing: responses[1],
            completed: responses[2],
          });
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [getTournaments, groupInfo.id]);

  const handleCreateTournament = () => {
    if (canCreateTournament) {
      navigate('/tournaments/create');
    } else {
      navigate('/pricing');
    }
  };

  if (isLoading) {
    return <CenterLoading height="10vh" />;
  }

  return (
    <Stack gap={4}>
      <Button onClick={handleCreateTournament}>Create tournament</Button>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <EmojiEventsIcon />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Upcoming Tournaments
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
          <EmojiEventsIcon />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Ongoing Tournaments
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
          <WorkspacePremiumIcon />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Completed Tournaments
          </Typography>
        </Stack>

        <TournamentList tournaments={tournaments.completed} />
      </Box>
    </Stack>
  );
}
