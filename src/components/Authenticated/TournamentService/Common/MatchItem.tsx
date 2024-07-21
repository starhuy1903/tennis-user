import EditIcon from '@mui/icons-material/Edit';
import PlaceIcon from '@mui/icons-material/Place';
import { Avatar, Box, Chip, Divider, IconButton, Stack, SxProps, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';

import { MatchState } from 'constants/match';
import { Match } from 'types/tournament-fixtures';

import MatchStatusBadge from './MatchStatusBadge';
import { DoubleParticipantInfo, SingleParticipantInfo, UndefinedSinglePlayer } from './ParticipantInfo';

type MathItemProps = {
  match: Match;
  onViewDetails: (match: Match) => void;
  onEdit?: (match: Match) => void;
  isGeneratedFixture?: boolean;
  isCreator?: boolean;
  wrapperSx?: SxProps;
  type: 'schedule' | 'matches';
};

export const MatchItem = ({
  match,
  onEdit,
  onViewDetails,
  isCreator,
  isGeneratedFixture,
  wrapperSx,
  type,
}: MathItemProps) => {
  const shouldShowScore = [MatchState.WALK_OVER, MatchState.DONE, MatchState.SCORE_DONE].includes(match.status);

  const isSinglePlayerMatch = match.teams.team1?.user1 && !match.teams.team1?.user2;
  const hasBothTeamData = !!match.teams.team1 && !!match.teams.team2;
  const canGoToDetailMatch = !!isGeneratedFixture && hasBothTeamData;

  const isScheduleTab = type === 'schedule';
  const isMatchesTab = type === 'matches';

  return (
    <Box
      sx={{
        'display': 'flex',
        'justifyContent': 'space-between',
        'gap': 2,
        'flex': 1,
        'border': '1px solid',
        'borderColor': 'divider',
        'borderRadius': 4,
        'maxWidth': 500,

        '&:hover': {
          bgcolor: isMatchesTab && canGoToDetailMatch ? grey[200] : '#F7F7F7',
          cursor: isMatchesTab && canGoToDetailMatch ? 'pointer' : 'default',
        },
        ...wrapperSx,
      }}
      onClick={() => isMatchesTab && canGoToDetailMatch && onViewDetails(match)}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
      >
        {/* Match status */}
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

        {/* Match teams */}
        <Stack
          direction="row"
          gap={1}
          flexGrow={1}
          py={1}
        >
          <Stack gap={1}>
            {match.teams.team1 ? (
              isSinglePlayerMatch ? (
                <SingleParticipantInfo
                  name={match.teams.team1.user1.name}
                  image={match.teams.team1.user1.image}
                  shouldShowElo
                  elo={match.teams.team1.user1.elo}
                />
              ) : (
                <DoubleParticipantInfo
                  name1={match.teams.team1.user1.name}
                  image1={match.teams.team1.user1.image}
                  name2={match.teams.team1.user2?.name}
                  image2={match.teams.team1.user2?.image}
                  shouldShowTotalElo
                  totalElo={match.teams.team1.totalElo}
                />
              )
            ) : (
              <UndefinedSinglePlayer />
            )}
            <Divider>
              <Typography
                fontSize={12}
                color={grey[600]}
              >
                vs
              </Typography>
            </Divider>
            {match.teams.team2 ? (
              isSinglePlayerMatch ? (
                <SingleParticipantInfo
                  name={match.teams.team2.user1.name}
                  image={match.teams.team2.user1.image}
                  shouldShowElo
                  elo={match.teams.team2.user1.elo}
                />
              ) : (
                <DoubleParticipantInfo
                  name1={match.teams.team2.user1.name}
                  image1={match.teams.team2.user1.image}
                  name2={match.teams.team2.user2?.name}
                  image2={match.teams.team2.user2?.image}
                  shouldShowTotalElo
                  totalElo={match.teams.team2.totalElo}
                />
              )
            ) : (
              <UndefinedSinglePlayer />
            )}
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
      {/* Match Action */}
      {isScheduleTab && isCreator && (
        <>
          <Box
            display="flex"
            height="100%"
          >
            <Divider
              orientation="vertical"
              flexItem
            />
            <Stack
              gap={2}
              height="100%"
              p={2}
              flex={1}
            >
              <Stack gap={1}>
                <Box>
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
                {match.referee && (
                  <Box>
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
                  </Box>
                )}
              </Stack>
              <Stack>
                <Box>
                  <Tooltip
                    title="Edit match information"
                    placement="right"
                  >
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(match);
                      }}
                    >
                      <EditIcon
                        fontSize="small"
                        color="warning"
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};

{
  /* {shouldShowViewMatchDetailsBtn && (
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
      )} */
}
