import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SensorsIcon from '@mui/icons-material/Sensors';
import { Chip, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { FormatDateTime } from 'constants/datetime';
import { MatchState } from 'constants/match';
import { displayDateTime } from 'utils/datetime';

type MatchStatusBadgeProps = {
  status: MatchState;
  startDateTime: string;
};

export default function MatchStatusBadge({ status, startDateTime }: MatchStatusBadgeProps) {
  if (status === MatchState.SCHEDULED || status === MatchState.NO_SHOW) {
    return (
      <Stack
        alignItems="center"
        gap={1}
      >
        <NotificationsNoneIcon
          sx={{ color: grey[500] }}
          fontSize="small"
        />
        <Typography
          fontSize={12}
          variant="body2"
          fontWeight={600}
        >
          {displayDateTime({ dateTime: startDateTime, targetFormat: FormatDateTime.TIME_AND_DATE })}
        </Typography>
        <Typography
          fontSize={12}
          color={grey[600]}
        >
          Not started
        </Typography>
      </Stack>
    );
  }

  if (status === MatchState.WALK_OVER) {
    return (
      <Stack alignItems="center">
        <Chip
          color="error"
          icon={<SensorsIcon />}
          label="Live"
        />
      </Stack>
    );
  }

  if (status === MatchState.SCORE_DONE) {
    return (
      <Stack alignItems="center">
        <Typography
          fontSize={14}
          variant="body2"
          fontWeight={600}
        >
          Finished
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack alignItems="center">
      <Typography
        fontSize={14}
        variant="body2"
        fontWeight={600}
      >
        No info
      </Typography>
    </Stack>
  );
}
