import { Box, Typography } from '@mui/material';
import { ArrowRightIcon } from '@mui/x-date-pickers';

import { Match } from 'types/tournament-fixtures';

export default function ScoreList({ match, teamNumber }: { match: Match | any; teamNumber: 1 | 2 }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {match.teams[teamNumber - 1].isWinner && (
        <ArrowRightIcon
          color="primary"
          fontSize="large"
        />
      )}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mr: 2,
        }}
      >
        {match.finalScore && (
          <Typography
            variant="body1"
            fontWeight={600}
          >
            {match.finalScore[`team${teamNumber}`]}
          </Typography>
        )}

        {match.scores
          ?.slice()
          .reverse()
          .map((score: any, index: number) => (
            <Typography
              key={index}
              variant="body1"
            >
              {score[`team${teamNumber}`]}
              {score[`tiebreakTeam${teamNumber}`] && (
                <sup
                  style={{
                    fontSize: 10,
                    marginLeft: 2,
                  }}
                >
                  {score[`tiebreakTeam${teamNumber}`]}
                </sup>
              )}
            </Typography>
          ))}
      </Box>
    </Box>
  );
}
