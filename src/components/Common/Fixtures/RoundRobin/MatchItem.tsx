import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import PlaceIcon from '@mui/icons-material/Place';
import { Avatar, Box, Button, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { amber, green } from '@mui/material/colors';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';
import { useAppSelector } from 'store';

import { MatchStatusBadge } from 'components/Common/Match/MatchStatusBadge';
import { FormatDateTime } from 'constants/datetime';
import { MatchState } from 'constants/match';
import { checkTournamentRole } from 'store/slice/tournamentSlice';
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
  onViewDetails: (match: Match) => void;
  onEdit: (match: Match) => void;
  shouldShowViewMatchDetailsBtn?: boolean;
};

export const MatchItem = ({ match, onViewDetails, onEdit, shouldShowViewMatchDetailsBtn }: MathItemProps) => {
  const { isCreator } = useAppSelector(checkTournamentRole);
  const shouldShowScore = [MatchState.WALK_OVER, MatchState.DONE, MatchState.SCORE_DONE].includes(match.status);

  return (
    <Stack
      justifyContent="space-between"
      onClick={() => onViewDetails(match)}
      gap={2}
      px={4}
      py={2}
      position="relative"
    >
      {isCreator && (
        <Tooltip
          title="Edit"
          placement="right"
        >
          <IconButton
            sx={{
              'position': 'absolute',
              'top': 0,
              'right': 0,
              'transform': 'translate(50%, -50%)',
              'border': '1px solid',
              'borderColor': 'divider',
              'backgroundColor': 'background.paper',
              '&:hover': {
                backgroundColor: 'background.default',
              },
            }}
            size="small"
            onClick={() => onEdit(match)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      <Box
        pl={2}
        display="flex"
        gap={1}
      >
        <Chip
          variant="outlined"
          icon={
            <AccessAlarmIcon
              fontSize="small"
              color="success"
              sx={{ color: amber[700] }}
            />
          }
          label={displayDateTime({
            dateTime: match.matchStartDate || '',
            targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
          })}
        />
        <Chip
          variant="outlined"
          icon={
            <PlaceIcon
              fontSize="small"
              color="success"
              sx={{ color: green[700] }}
            />
          }
          label={match.venue}
        />
      </Box>
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
      {shouldShowViewMatchDetailsBtn && (
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="outlined"
            startIcon={<ArrowForwardIcon />}
            onClick={() => onViewDetails(match)}
            size="small"
            sx={{ borderRadius: 100 }}
          >
            View details
          </Button>
        </Box>
      )}
    </Stack>
  );
};
