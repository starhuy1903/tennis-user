import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import EditIcon from '@mui/icons-material/Edit';
import PlaceIcon from '@mui/icons-material/Place';
import { Avatar, Box, Chip, Divider, IconButton, Stack, SxProps, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useMemo } from 'react';

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
  const isEndedMatch = match.status === MatchState.DONE || match.status === MatchState.SCORE_DONE;

  const setScores = useMemo(
    () =>
      isEndedMatch
        ? match.sets
            ?.slice()
            .reverse()
            .map((set) => {
              return {
                id: set.id,
                team1Score: set.setFinalScore.team1,
                team2Score: set.setFinalScore.team2,
                isTieBreak: set.isTieBreak,
                tieBreakTeam1Score: set.setFinalScore.tieBreak?.team1,
                tieBreakTeam2Score: set.setFinalScore.tieBreak?.team2,
                isTeam1Winner: set.teamWinId === match.teamId1,
                isTeam2Winner: set.teamWinId === match.teamId2,
              };
            })
        : [],
    [isEndedMatch, match.sets, match.teamId1, match.teamId2]
  );

  const isTeam1Winner = match.teamWinnerId === match.teamId1;
  const isTeam2Winner = match.teamWinnerId === match.teamId2;

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
          <Stack
            gap={1}
            flex={1}
            width={180}
          >
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
            <Box
              display="flex"
              alignItems="center"
              gap={4}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                gap={3}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                >
                  {isTeam1Winner ? (
                    <ArrowLeftIcon />
                  ) : (
                    <Box
                      width={24}
                      height={24}
                    />
                  )}
                  <Typography fontWeight={isTeam1Winner ? 600 : 400}>{match.team1MatchScore}</Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                >
                  {isTeam2Winner ? (
                    <ArrowLeftIcon />
                  ) : (
                    <Box
                      width={24}
                      height={24}
                    />
                  )}
                  <Typography fontWeight={isTeam2Winner ? 600 : 400}>{match.team2MatchScore}</Typography>
                </Box>
              </Stack>

              <Box
                display="flex"
                alignItems="center"
                gap={2}
              >
                {setScores?.map((set) => {
                  return (
                    <Stack
                      key={set.id}
                      gap={3}
                    >
                      <Typography>
                        {set.team1Score}
                        {set.isTieBreak && (
                          <sup
                            style={{
                              fontSize: 10,
                              marginLeft: 2,
                            }}
                          >
                            {set.tieBreakTeam1Score}
                          </sup>
                        )}
                      </Typography>
                      <Typography>
                        {set.team2Score}
                        {set.isTieBreak && (
                          <sup
                            style={{
                              fontSize: 10,
                              marginLeft: 2,
                            }}
                          >
                            {set.tieBreakTeam2Score}
                          </sup>
                        )}
                      </Typography>
                    </Stack>
                  );
                })}
              </Box>
            </Box>
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
