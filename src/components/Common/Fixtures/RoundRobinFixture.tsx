import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Avatar, Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { MatchStatus } from 'constants/tournament-fixtures';
import { FinalScore, Match, Round, User } from 'types/tournament-fixtures';
import { displayDate, displayTime } from 'utils/datetime';

import { MatchStatusBadge } from '../Match/MatchStatusBadge';
import NoData from '../NoData';

const CustomPlayer = ({ player, direction }: { player: User; direction: 'left' | 'right' }) => {
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

export const MatchItem = ({ match }: { match: Match }) => {
  const isShowScore =
    match.status === MatchStatus.WALK_OVER ||
    match.status === MatchStatus.DONE ||
    match.status === MatchStatus.SCORE_DONE;

  return (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
      }}
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
          <strong>Date / Time:</strong> {displayDate(match.date)}, {displayTime(match.date)}
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
          <Stack direction="column">
            {match.teams.team1 && (
              <>
                <CustomPlayer
                  player={match.teams.team1.user1}
                  direction="left"
                />

                {match.teams.team1?.user2 && (
                  <CustomPlayer
                    player={match.teams.team1.user2}
                    direction="left"
                  />
                )}
              </>
            )}
          </Stack>

          {isShowScore ? (
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
          {isShowScore ? (
            <CustomScore
              finalScore={match.finalScore}
              team={1}
            />
          ) : (
            <Box />
          )}

          <Stack direction="column">
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

        <Button
          component={Link}
          to={`matches/${match.id}`}
          variant="contained"
          color="info"
          sx={{
            borderRadius: 0,
          }}
        >
          Details
        </Button>

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
    </Box>
  );
};

export function RoundRobinFixture({ rounds }: { rounds: Round[] }) {
  if (!rounds || rounds.length === 0) {
    return <NoData message="No fixtures available" />;
  }

  return (
    <Container maxWidth="lg">
      <Stack
        direction="column"
        gap={6}
        my={5}
      >
        {rounds
          ?.slice()
          .reverse()
          .map((round, roundIndex) => (
            <Box
              key={roundIndex}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography
                variant="h4"
                fontWeight={600}
                textAlign="center"
              >
                {round.title}
              </Typography>

              {round.matches.map((match, matchIndex) => (
                <MatchItem
                  key={matchIndex}
                  match={match}
                />
              ))}
            </Box>
          ))}
      </Stack>
    </Container>
  );
}
