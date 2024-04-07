import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { TournamentStatus } from 'constants/tournament';
import { useLazyGetGroupTournamentsQuery } from 'store/api/group/groupApiSlice';
import { GroupTournament } from 'types/tournament';
import { showError } from 'utils/toast';

import GroupTournamentList from './GroupTournamentList';

export default function GroupTournaments() {
  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState<{
    upcoming: GroupTournament[];
    onGoing: GroupTournament[];
    completed: GroupTournament[];
  }>({
    upcoming: [],
    onGoing: [],
    completed: [],
  });

  const { groupId } = useParams();

  const [getTournaments, { isLoading }] = useLazyGetGroupTournamentsQuery();

  useEffect(() => {
    (async () => {
      try {
        if (groupId) {
          const responses = await Promise.all([
            getTournaments({ tournamentStatus: TournamentStatus.UPCOMING, groupId: parseInt(groupId) }).unwrap(),
            getTournaments({ tournamentStatus: TournamentStatus.ON_GOING, groupId: parseInt(groupId) }).unwrap(),
            getTournaments({ tournamentStatus: TournamentStatus.COMPLETED, groupId: parseInt(groupId) }).unwrap(),
          ]);
          setTournaments({
            upcoming: responses[0],
            onGoing: responses[1],
            completed: responses[2],
          });
        } else {
          showError('Group not found.');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getTournaments, groupId]);

  const handleCreateTournament = () => {
    navigate('/tournaments/create');
  };

  if (isLoading) {
    return <CenterLoading height="10vh" />;
  }

  return (
    <Stack
      gap={4}
      mt={4}
    >
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
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
          <Button
            variant="outlined"
            onClick={handleCreateTournament}
          >
            Create tournament
          </Button>
        </Stack>
        <GroupTournamentList tournaments={tournaments.upcoming} />
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

        <GroupTournamentList tournaments={tournaments.onGoing} />
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

        <GroupTournamentList tournaments={tournaments.completed} />
      </Box>
    </Stack>
  );
}
