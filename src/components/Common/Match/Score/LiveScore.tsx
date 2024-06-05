import { Box, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { Timer } from 'components/Common/Timer';
import { MatchMetaData } from 'types/match';

import { MatchStatusBadge } from '../MatchStatusBadge';

const getNewestGameScore = (match: MatchMetaData) => {
  const { sets } = match;
  const lastSet = sets[sets.length - 1];

  return lastSet.games[lastSet.games.length - 1];
};

type LiveScoreProps = {
  match: MatchMetaData;
};

export default function LiveScore({ match }: LiveScoreProps) {
  const newestGameScore = useMemo(() => getNewestGameScore(match), [match]);

  return (
    <Stack alignItems="center">
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={600}
          lineHeight={1.5}
        >
          {newestGameScore.scores[0].team1Score}
        </Typography>

        <MatchStatusBadge status={match.status} />

        <Typography
          variant="h3"
          fontWeight={600}
          lineHeight={1.5}
        >
          {}
        </Typography>
      </Box>

      <Timer date={match.matchStartDate} />
    </Stack>
  );
}
