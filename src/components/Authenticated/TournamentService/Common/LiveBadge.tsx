import { Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

export default function LiveBadge() {
  return (
    <Box>
      <Typography
        sx={{
          'display': 'flex',
          'alignItems': 'center',
          'color': 'white',
          'backgroundColor': red[600],
          'padding': '0.2em 0.6em',
          'borderRadius': '4px',
          'position': 'relative',

          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '50%': {
              transform: 'scale(1.5)',
              opacity: 0.5,
            },
            '100%': {
              transform: 'scale(1)',
              opacity: 1,
            },
          },

          '&::before': {
            content: `''`,
            display: 'block',
            width: '10px',
            height: '10px',
            backgroundColor: 'white',
            borderRadius: '50%',
            marginRight: 2,
            animation: 'pulse 1.5s infinite',
          },
        }}
      >
        Live
      </Typography>
    </Box>
  );
}
