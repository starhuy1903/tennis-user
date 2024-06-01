import { Avatar, Box, Typography } from '@mui/material';

import { Player } from 'types/tournament-fixtures';

export default function TeamPlayer({ player }: { player: Player }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Avatar
        src={player.image}
        alt={player.name}
        sx={{ width: '50px', height: '50px' }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="body1"
          fontWeight={600}
        >
          {player.name}
        </Typography>
        <Typography variant="caption">{player.elo} ELO</Typography>
      </Box>
    </Box>
  );
}
