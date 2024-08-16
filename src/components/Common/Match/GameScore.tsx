import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { Box, Chip, Stack, Typography } from '@mui/material';

import { Game, MatchMetaData } from 'types/match';

type GameScoreProps = {
  match: MatchMetaData;
  game: Game;
  title: string;
  winnerName: string;
  isLatest: boolean;
};

export default function GameScore({ match, game, title, winnerName, isLatest }: GameScoreProps) {
  const newestScoreId = game.scores[0].id;
  return (
    <Stack>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography>Winner: {winnerName}</Typography>
      <Stack
        direction="row"
        gap={1}
        flexWrap="wrap"
        mt={1}
      >
        {game.scores
          .slice()
          .reverse()
          .slice(1)
          .map((score) => (
            <Chip
              key={score.id}
              size="medium"
              label={
                <Box
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                >
                  {score.teamServeId === match.team1.id && (
                    <SportsBaseballIcon
                      sx={{
                        color: '#89BF3D',
                      }}
                      fontSize="small"
                    />
                  )}

                  <Box>{`${score.team1Score} - ${score.team2Score}`}</Box>

                  {score.teamServeId === match.team2.id && (
                    <SportsBaseballIcon
                      sx={{
                        color: '#89BF3D',
                      }}
                      fontSize="small"
                    />
                  )}
                </Box>
              }
              color={isLatest && newestScoreId === score.id ? 'primary' : 'default'}
            />
          ))}
      </Stack>
    </Stack>
  );
}
