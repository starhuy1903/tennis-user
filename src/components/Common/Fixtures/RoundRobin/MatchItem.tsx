import { Avatar, Box, Stack, Typography } from '@mui/material';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers';

import { MatchStatusBadge } from 'components/Common/Match/MatchStatusBadge';
import { FormatDateTime } from 'constants/datetime';
import { MatchStatus } from 'constants/tournament-fixtures';
import { FinalScore, Match, Player } from 'types/tournament-fixtures';
import { displayDateTime } from 'utils/datetime';

const CustomPlayer = ({ player, direction }: { player: Player; direction: 'left' | 'right' }) => {
  if (direction === 'left') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Box
          sx={{
            borderLeft: '1px solid #E0E0E0',
            borderRight: '1px solid #E0E0E0',
            padding: 1,
          }}
        >
          <Avatar
            src={player.image}
            alt={player.name}
            sx={{ width: '80px', height: '80px' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
          >
            {player.name}
          </Typography>

          <Typography variant="body2">{player.elo} ELO</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
        >
          {player.name}
        </Typography>

        <Typography variant="body2">{player.elo} ELO</Typography>
      </Box>

      <Box
        sx={{
          borderLeft: '1px solid #E0E0E0',
          borderRight: '1px solid #E0E0E0',
          padding: 1,
        }}
      >
        <Avatar
          src={player.image}
          alt={player.name}
          sx={{ width: '80px', height: '80px' }}
        />
      </Box>
    </Box>
  );
};

const CustomScore = ({ finalScore, team }: { finalScore: FinalScore; team: 1 | 2 }) => {
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
  const shouldShowScore = [MatchStatus.WALK_OVER, MatchStatus.DONE, MatchStatus.SCORE_DONE].includes(match.status);

  return (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          borderBottom: '1px solid #E0E0E0',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography
          variant="caption"
          color="gray"
        >
          <strong>Date / Time:</strong>{' '}
          {displayDateTime({ dateTime: match.matchStartDate || '', targetFormat: FormatDateTime.DATE_AND_FULL_TIME })}
        </Typography>

        <Typography
          variant="caption"
          color="gray"
        >
          <strong>Venue:</strong> {match.venue}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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

          <Stack>
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

      {match.teams.team1?.user2 && (
        <Box
          sx={{
            borderTop: '1px solid #E0E0E0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 18,
          }}
        >
          <Box>
            {match.teams.team1?.user2 && (
              <Typography
                variant="h6"
                color="green"
              >
                {match.teams.team1.totalElo} ELO
              </Typography>
            )}
          </Box>

          {/* <Button
            component={Link}
            to={`matches/${match.id}`}
            variant="contained"
            color="info"
            sx={{
              borderRadius: 0,
            }}
          >
            Details
          </Button> */}

          <Box>
            {match.teams.team2?.user2 && (
              <Typography
                variant="h6"
                color="green"
              >
                {match.teams.team2.totalElo} ELO
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};
