import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useGetCreatedTournamentsQuery } from 'store/api/tournament/tournamentApiSlice';

import TournamentList from './TournamentList';

export default function ManageTournaments() {
  const navigate = useNavigate();

  const { data: tournaments, isLoading } = useGetCreatedTournamentsQuery();

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
            <EmojiEventsIcon
              sx={{
                color: '#FF8A08',
              }}
            />
            <Typography
              variant="h5"
              fontWeight={500}
            >
              My Created Tournaments
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

        {tournaments && tournaments.length !== 0 ? (
          <TournamentList tournaments={tournaments} />
        ) : (
          <NoData message="You have not created any tournaments." />
        )}
      </Box>
    </Stack>
  );
}
