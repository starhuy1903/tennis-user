import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Avatar, Box, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { MatchState } from 'constants/match';
import { Match, Player } from 'types/tournament-fixtures';

import MatchStatusBadge from './MatchStatusBadge';

const CustomPlayer = ({ player }: { player: Player }) => {
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
          sx={{ width: '40px', height: '40px' }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography fontSize={14}>{player.name}</Typography>

        <Tooltip title="elo">
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
          >
            <WhatshotIcon
              color="warning"
              sx={{ fontSize: 16 }}
            />
            <Typography
              fontSize={10}
              fontWeight={400}
            >
              {player.elo ? player.elo : '--'}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

const SinglePlayerSkeleton = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
    >
      <Skeleton
        variant="circular"
        width={40}
        height={40}
        animation={false}
      />
      <Typography
        fontSize={14}
        color={grey[500]}
      >
        Undefined
      </Typography>
    </Box>
  );
};

type MathItemProps = {
  match: Match;
  onViewDetails: (match: Match) => void;
  onEdit: (match: Match) => void;
  shouldShowViewMatchDetailsBtn?: boolean;
  isCreator: boolean;
};

export const MatchItem = ({ match }: MathItemProps) => {
  const shouldShowScore = [MatchState.WALK_OVER, MatchState.DONE, MatchState.SCORE_DONE].includes(match.status);

  return (
    <Stack
      justifyContent="space-between"
      gap={2}
      px={4}
      py={2}
      position="relative"
    >
      {/* {isCreator && (
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
      )} */}
      {/* <Box
        pl={2}
        display="flex"
        gap={1}
      >
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
        {match.referee && (
          <Tooltip title="Referee">
            <Chip
              avatar={
                <Avatar
                  alt="Referee"
                  src={match.referee.image}
                />
              }
              label={match.referee.name}
              variant="outlined"
            />
          </Tooltip>
        )}
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flex: 1,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          maxWidth: 500,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          flex={1}
        >
          <Stack
            width={140}
            alignItems="center"
            py={1}
          >
            <MatchStatusBadge
              status={match.status}
              startDateTime={match.matchStartDate || ''}
            />
          </Stack>

          <Stack
            direction="row"
            gap={1}
            flexGrow={1}
            py={1}
          >
            <Stack gap={1}>
              {match.teams.team1 ? <CustomPlayer player={match.teams.team1.user1} /> : <SinglePlayerSkeleton />}
              {match.teams.team2 ? <CustomPlayer player={match.teams.team2.user1} /> : <SinglePlayerSkeleton />}
            </Stack>

            {shouldShowScore && (
              <Stack
                alignItems="center"
                justifyContent="center"
                ml={2}
                gap={1}
              >
                <Typography fontWeight={match.teamWinnerId === match.teamId1 ? 600 : 400}>
                  {match.team1MatchScore}
                </Typography>
                <Typography fontWeight={match.teamWinnerId === match.teamId2 ? 600 : 400}>
                  {match.team2MatchScore}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
      {/* {shouldShowViewMatchDetailsBtn && (
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
      )} */}
    </Stack>
  );
};
