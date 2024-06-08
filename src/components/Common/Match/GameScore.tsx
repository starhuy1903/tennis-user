import { Chip, Stack, Typography } from '@mui/material';

import { Game } from 'types/match';

type GameScoreProps = {
  game: Game;
  title: string;
  winnerName: string;
  isLatest: boolean;
};

export default function GameScore({ game, title, winnerName, isLatest }: GameScoreProps) {
  const newestScoreId = game.scores[0].id;

  return (
    <Stack>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography>Winner: {winnerName}</Typography>
      <Stack
        direction="row"
        spacing={1}
      >
        {game.scores
          .slice()
          .reverse()
          .slice(1)
          .map((score) => (
            <Chip
              key={score.id}
              size="small"
              label={`${score.team1Score} - ${score.team2Score}`}
              color={isLatest && newestScoreId === score.id ? 'primary' : 'default'}
            />
          ))}
      </Stack>
    </Stack>
  );
}
