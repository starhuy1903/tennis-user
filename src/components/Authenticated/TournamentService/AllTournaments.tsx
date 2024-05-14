import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { TournamentStatus } from 'constants/tournament';
import {
  useLazyGetOpenTournamentsQuery,
  useLazyGetUnregisteredTournamentsQuery,
} from 'store/api/tournament/tournamentApiSlice';
import { OpenTournament } from 'types/tournament';

import TournamentList from './TournamentList';

export default function AllTournaments() {
  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState<{
    upcoming: OpenTournament[];
    onGoing: OpenTournament[];
    completed: OpenTournament[];
    unregistered: OpenTournament[];
  }>({
    upcoming: [],
    onGoing: [],
    completed: [],
    unregistered: [],
  });

  const [getUnregisteredTournaments, { isLoading: fetchingUnregisteredTournaments }] =
    useLazyGetUnregisteredTournamentsQuery();
  const [getTournaments, { isLoading: fetchingTournament }] = useLazyGetOpenTournamentsQuery();

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          getTournaments(TournamentStatus.UPCOMING, true).unwrap(), // Cache to avoid multiple requests
          getTournaments(TournamentStatus.ON_GOING, true).unwrap(),
          getTournaments(TournamentStatus.COMPLETED, true).unwrap(),
          getUnregisteredTournaments(undefined, true).unwrap(),
        ]);
        setTournaments({
          upcoming: responses[0],
          onGoing: responses[1],
          completed: responses[2],
          unregistered: responses[3],
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getTournaments, getUnregisteredTournaments]);

  const handleCreateTournament = () => {
    navigate('/tournaments/create');
  };

  if (fetchingUnregisteredTournaments || fetchingTournament) {
    return <CenterLoading height="10vh" />;
  }

  return (
    <Stack gap={4}>
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
            <NewReleasesIcon color="primary" />
            <Typography
              variant="h5"
              fontWeight={500}
            >
              New Tournaments
            </Typography>
          </Stack>

          <Button
            variant="contained"
            size="small"
            onClick={handleCreateTournament}
          >
            Create tournament
          </Button>
        </Stack>
        {tournaments.unregistered.length !== 0 ? (
          <TournamentList
            tournaments={tournaments.unregistered}
            isRegisterable
          />
        ) : (
          <NoData message="There are no new tournaments to join." />
        )}
      </Box>

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
          <LocalFireDepartmentIcon
            sx={{
              color: '#F08A5D',
            }}
          />
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
          <WorkspacePremiumIcon
            sx={{
              color: '#FF2E63',
            }}
          />
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
