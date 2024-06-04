import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Stack, Typography } from '@mui/material';

import { MatchFinalScore, MatchMetaData, TeamType } from 'types/match';

import { Timer } from '../Timer';
import { MatchStatusBadge } from './MatchStatusBadge';

const MatchScore = ({ finalScore, team }: { finalScore: MatchFinalScore; team: TeamType }) => {
  return (
    <>
      {finalScore.team1 > finalScore.team2 && team === 1 && (
        <ArrowRightIcon
          color="primary"
          fontSize="large"
          sx={{
            position: 'absolute',
            left: '-40px',
          }}
        />
      )}

      {finalScore && (
        <Typography
          variant="h3"
          fontWeight={600}
          lineHeight={1.5}
        >
          {finalScore[`team${team}`]}
        </Typography>
      )}

      {finalScore.team1 < finalScore.team2 && team === 2 && (
        <ArrowLeftIcon
          color="primary"
          fontSize="large"
          sx={{
            position: 'absolute',
            right: '-40px',
          }}
        />
      )}
    </>
  );
};

type MatchScoreProps = {
  match: MatchMetaData;
  isLive?: boolean;
};

export default function MainScore({ match, isLive }: MatchScoreProps) {
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
        <MatchScore
          finalScore={match.matchFinalScore}
          team={1}
        />

        <MatchStatusBadge status={match.status} />

        <MatchScore
          finalScore={match.matchFinalScore}
          team={2}
        />
      </Box>

      {isLive && <Timer date={match.matchStartDate} />}
    </Stack>
  );
}
