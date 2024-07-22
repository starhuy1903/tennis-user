import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Stack, Typography } from '@mui/material';

import { MatchState } from 'constants/match';
import { MatchFinalScore, MatchMetaData, TeamType } from 'types/match';

import { MatchStatusBadge } from './MatchStatusBadge';
import LiveScore from './Score/LiveScore';

const MatchScore = ({ finalScore, team }: { finalScore: MatchFinalScore; team: TeamType }) => {
  return (
    <>
      {finalScore.team1 > finalScore.team2 && team === 1 && (
        <ArrowRightIcon
          color="success"
          sx={{
            fontSize: '60px',
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
          color="success"
          sx={{
            fontSize: '60px',
            position: 'absolute',
            right: '-50px',
          }}
        />
      )}
    </>
  );
};

type MatchScoreProps = {
  match: MatchMetaData;
};

export default function MainScore({ match }: MatchScoreProps) {
  const { status } = match;

  const isScheduled = status === MatchState.SCHEDULED;
  const isLive = status === MatchState.WALK_OVER;
  const isDone = status === MatchState.SCORE_DONE;

  const renderBody = () => {
    if (isScheduled) {
      return <MatchStatusBadge status={match.status} />;
    }
    if (isLive) {
      return <LiveScore match={match} />;
    }
    if (isDone) {
      return (
        <>
          <MatchScore
            finalScore={match.matchFinalScore}
            team={1}
          />

          <MatchStatusBadge status={match.status} />

          <MatchScore
            finalScore={match.matchFinalScore}
            team={2}
          />
        </>
      );
    }
  };

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
        {renderBody()}
      </Box>
    </Stack>
  );
}
