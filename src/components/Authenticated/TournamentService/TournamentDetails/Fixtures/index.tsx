import { Box } from '@mui/material';
import { useState } from 'react';

import MatchesList from './MatchesList';
import SetupFixture from './SetupFixture';

const participants = [];

const matches = [];

export default function Fixtures() {
  const [matchesData, setMatchesData] = useState([]);

  // TODO: get participants from the tournament

  return (
    <Box
      mt={4}
      mb={8}
    >
      <SetupFixture />
      {matchesData.length > 0 && <MatchesList matches={matchesData} />}
    </Box>
  );
}
