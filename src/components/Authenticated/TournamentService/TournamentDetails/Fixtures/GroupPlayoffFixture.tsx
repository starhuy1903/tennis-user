import { Box, Divider } from '@mui/material';

import { TournamentFixture } from 'types/tournament-fixtures';

import KnockoutFixtures from './KnockoutFixture';
import { RoundRobinFixture } from './RoundRobinFixture';

export default function GroupPlayoffFixture({ fixture }: { fixture: TournamentFixture }) {
  return (
    <Box>
      <KnockoutFixtures fixture={fixture} />

      <Divider sx={{ my: 5 }} />

      <RoundRobinFixture fixture={fixture} />
    </Box>
  );
}
