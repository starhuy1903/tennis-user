import { Chip, Stack, Typography } from '@mui/material';

import { Game } from 'types/match';

type GameScoreProps = {
  game: Game;
  title: string;
  winnerName: string;
};

export default function GameScore({ game, title, winnerName }: GameScoreProps) {
  return (
    <Stack>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography>3 - 2</Typography>
      <Typography>Winner: {winnerName}</Typography>
      <Stack
        direction="row"
        spacing={1}
      >
        {game.scores
          .slice()
          .reverse()
          .slice(1)
          .map((score) => {
            return (
              <Chip
                key={score.id}
                size="small"
                label={`${score.team1Score} - ${score.team2Score}`}
              />
            );
          })}
      </Stack>
    </Stack>
  );
}
