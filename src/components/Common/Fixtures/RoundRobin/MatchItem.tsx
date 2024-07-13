import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PlaceIcon from '@mui/icons-material/Place';
import { Avatar, Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';

import { MatchStatusBadge } from 'components/Common/Match/MatchStatusBadge';
import { FormatDateTime } from 'constants/datetime';
import { MatchState } from 'constants/match';
import { MatchFinalScore } from 'types/match';
import { Match, Player } from 'types/tournament-fixtures';
import { displayDateTime } from 'utils/datetime';

const CustomPlayer = ({ player, direction }: { player: Player; direction: 'left' | 'right' }) => {
  if (direction === 'left') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box>
          <Avatar
            src={player.image}
            alt={player.name}
            sx={{ width: '50px', height: '50px' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography>{player.name}</Typography>

          {player.elo && <Typography variant="body2">{player.elo} ELO</Typography>}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Stack
        sx={{
          alignItems: 'flex-end',
        }}
      >
        <Typography>{player.name}</Typography>

        {player.elo && <Typography variant="body2">{player.elo} ELO</Typography>}
      </Stack>

      <Box>
        <Avatar
          src={player.image}
          alt={player.name}
          sx={{ width: '50px', height: '50px' }}
        />
      </Box>
    </Box>
  );
};

const CustomScore = ({ finalScore, team }: { finalScore: MatchFinalScore; team: 1 | 2 }) => {
  return (
    <>
      {finalScore.team1 > finalScore.team2 && team === 1 && (
        <ArrowRightIcon
          color="primary"
          fontSize="large"
          sx={{
            position: 'absolute',
            left: '-40px',
          }}
        />
      )}

      {finalScore && (
        <Typography
          variant="h3"
          fontWeight={600}
          lineHeight={1.5}
        >
          {finalScore[`team${team}`]}
        </Typography>
      )}

      {finalScore.team1 < finalScore.team2 && team === 2 && (
        <ArrowLeftIcon
          color="primary"
          fontSize="large"
          sx={{
            position: 'absolute',
            right: '-40px',
          }}
        />
      )}
    </>
  );
};

type MathItemProps = {
  match: Match;
  onClick: () => void;
};

export const MatchItem = ({ match, onClick }: MathItemProps) => {
  const shouldShowScore = [MatchState.WALK_OVER, MatchState.DONE, MatchState.SCORE_DONE].includes(match.status);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{
        'cursor': 'pointer',
        '&:hover': {
          backgroundColor: purple[50],
        },
      }}
      onClick={onClick}
      gap={4}
      py={2}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            px: 2,
          }}
        >
          <Stack>
            {match.teams.team1 && (
              <>
                <CustomPlayer
                  player={match.teams.team1.user1}
                  direction="left"
                />

                {match.teams.team1.user2 && (
                  <CustomPlayer
                    player={match.teams.team1.user2}
                    direction="left"
                  />
                )}
              </>
            )}
          </Stack>

          {shouldShowScore ? (
            <CustomScore
              finalScore={match.finalScore}
              team={1}
            />
          ) : (
            <Box />
          )}
        </Box>

        <Box
          sx={{
            width: '30%',
          }}
        >
          <MatchStatusBadge status={match.status} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            px: 2,
          }}
        >
          {shouldShowScore ? (
            <CustomScore
              finalScore={match.finalScore}
              team={1}
            />
          ) : (
            <Box />
          )}

          <Stack gap={1}>
            {match.teams.team2 && (
              <>
                <CustomPlayer
                  player={match.teams.team2.user1}
                  direction="right"
                />

                {match.teams.team2?.user2 && (
                  <CustomPlayer
                    player={match.teams.team2.user2}
                    direction="right"
                  />
                )}
              </>
            )}
          </Stack>
        </Box>
      </Box>

      <Stack
        sx={{
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Chip
          variant="outlined"
          // color="info"
          icon={<AccessAlarmIcon fontSize="small" />}
          label={displayDateTime({
            dateTime: match.matchStartDate || '',
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />
        <Tooltip title={match.venue}>
          <PlaceIcon fontSize="small" />
        </Tooltip>
      </Stack>
    </Box>
  );
};
