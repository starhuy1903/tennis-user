import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Stack, Typography } from '@mui/material';

import { OpenTournament } from 'types/tournament';

import TournamentList from './TournamentList';

export default function ManageTournaments({ tournaments }: { tournaments: OpenTournament[] }) {
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
        </Stack>

        <TournamentList tournaments={tournaments} />
      </Box>
    </Stack>
  );
}
