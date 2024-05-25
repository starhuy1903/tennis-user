import { Box, Divider } from '@mui/material';

import { FixtureResponse } from 'types/tournament-fixtures';

export default function GroupPlayoffFixture({ fixture }: { fixture: FixtureResponse }) {
  console.log({ fixture });

  return (
    <Box>
      {/* <KnockoutFixtures rounds={fixture.knockoutRounds!} /> */}

      <Divider sx={{ my: 5 }} />

      {/* <RoundRobinFixture rounds={fixture.roundRobinRounds!} /> */}
    </Box>
  );
}
