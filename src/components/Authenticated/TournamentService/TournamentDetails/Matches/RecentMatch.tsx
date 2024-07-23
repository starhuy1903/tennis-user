import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Box, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Match } from 'types/tournament-fixtures';

import { SingleParticipantInfo } from '../../Common/ParticipantInfo';

export default function RecentMatch({ match }: { match: Match }) {
  return (
    <Box
      sx={{
        'border': '1px solid',
        'borderRadius': 4,
        'borderColor': 'divider',
        '&:hover': {
          bgcolor: grey[200],
          cursor: 'pointer',
        },
      }}
      p={2}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={6}
      >
        <Stack gap={1}>
          <SingleParticipantInfo
            name="Huy"
            image=""
          />

          <SingleParticipantInfo
            name="Khai"
            image=""
          />
        </Stack>
        <Stack gap={3.5}>
          <Box
            display="flex"
            alignItems="center"
          >
            <ArrowLeftIcon />
            <Typography
              variant="caption"
              fontWeight={700}
            >
              2
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <Box
              width={24}
              height={24}
            ></Box>
            <Typography
              variant="caption"
              color={grey[600]}
            >
              1
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
