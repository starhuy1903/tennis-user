import SensorsIcon from '@mui/icons-material/Sensors';
import { Typography } from '@mui/material';

import { FormatDateTime } from 'constants/datetime';
import { MatchStatus } from 'constants/tournament-fixtures';
import { displayDateTime } from 'utils/datetime';

const statusTextMap: { [key: string]: string } = {
  [MatchStatus.SCHEDULED]: 'SCHEDULED',
  [MatchStatus.NO_PARTY]: 'NO PARTY',
  [MatchStatus.WALK_OVER]: 'LIVE',
  [MatchStatus.DONE]: 'SCORING IN PROGRESS',
  [MatchStatus.SCORE_DONE]: 'FINISHED',
  [MatchStatus.NO_SHOW]: 'NO INFO',
};

export const MatchStatusBadge = ({
  status,
  type = 'default',
  date = '',
}: {
  status: string;
  type?: 'default' | 'knockout';
  date?: string;
}) => {
  const isScheduledOrDone = status === MatchStatus.SCHEDULED || status === MatchStatus.DONE;
  const isNoPartyOrScoreDone = status === MatchStatus.NO_PARTY || status === MatchStatus.SCORE_DONE;
  const isWalkOver = status === MatchStatus.WALK_OVER;

  if (type === 'knockout') {
    return (
      <Typography
        variant="body2"
        sx={{
          backgroundColor: isScheduledOrDone
            ? 'green'
            : isNoPartyOrScoreDone
              ? 'gray'
              : isWalkOver
                ? 'red'
                : (theme) => theme.palette.info.main,
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {status === MatchStatus.SCHEDULED ? (
          displayDateTime({ dateTime: date!, targetFormat: FormatDateTime.TIME_AND_DATE })
        ) : status === MatchStatus.WALK_OVER ? (
          <>
            <SensorsIcon fontSize="small" /> LIVE
          </>
        ) : (
          statusTextMap[status]
        )}
      </Typography>
    );
  }

  return (
    <Typography
      variant="h6"
      sx={{
        color: isScheduledOrDone
          ? 'green'
          : isNoPartyOrScoreDone
            ? 'gray'
            : isWalkOver
              ? 'red'
              : (theme) => theme.palette.info.main,
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {statusTextMap[status]}
    </Typography>
  );
};
