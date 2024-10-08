import { Box, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { Timer } from 'components/Common/Timer';
import { MatchMetaData } from 'types/match';

import { MatchStatusBadge } from '../MatchStatusBadge';

const getNewestGameScore = (match: MatchMetaData) => {
  const { sets } = match;
  const lastSet = sets[0];

  return lastSet.games[0];
};

type LiveScoreProps = {
  match: MatchMetaData;
};

export default function LiveScore({ match }: LiveScoreProps) {
  const newestGameScore = useMemo(() => getNewestGameScore(match), [match]);
  const currentSet = match.sets.length;
  const currentGame = match.sets[0].games.length;

  return (
    <Stack alignItems="center">
      <Box display="flex">
        <Typography>
          Set {currentSet} {currentGame !== 0 ? `- Game ${currentGame}` : ''}
        </Typography>
      </Box>
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
          width={130}
        >
          {newestGameScore?.scores[0].team1Score || 0}
        </Typography>

        <MatchStatusBadge status={match.status} />

        <Typography
          variant="h3"
          fontWeight={600}
          lineHeight={1.5}
          width={130}
          textAlign="right"
        >
          {newestGameScore?.scores[0].team2Score || 0}
        </Typography>
      </Box>

      {match.refereeMatchStartDate && <Timer date={match.refereeMatchStartDate} />}
    </Stack>
  );
}
