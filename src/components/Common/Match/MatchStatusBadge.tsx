import SensorsIcon from '@mui/icons-material/Sensors';
import { Typography } from '@mui/material';

import { FormatDateTime } from 'constants/datetime';
import { MatchState } from 'constants/match';
import { displayDateTime } from 'utils/datetime';

const statusTextMap: { [key: string]: string } = {
  [MatchState.SCHEDULED]: 'SCHEDULED',
  [MatchState.NO_PARTY]: 'NO PARTY',
  [MatchState.WALK_OVER]: 'LIVE',
  [MatchState.DONE]: 'SCORING IN PROGRESS',
  [MatchState.SCORE_DONE]: 'FINISHED',
  [MatchState.NO_SHOW]: 'NO INFO',
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
  const isScheduledOrDone = status === MatchState.SCHEDULED || status === MatchState.DONE;
  const isNoPartyOrScoreDone = status === MatchState.NO_PARTY || status === MatchState.SCORE_DONE;
  const isWalkOver = status === MatchState.WALK_OVER;

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
        {status === MatchState.SCHEDULED || status === MatchState.NO_SHOW ? (
          displayDateTime({ dateTime: date!, targetFormat: FormatDateTime.TIME_AND_DATE })
        ) : status === MatchState.WALK_OVER ? (
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
      variant="subtitle1"
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
