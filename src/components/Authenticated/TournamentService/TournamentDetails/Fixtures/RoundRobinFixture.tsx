import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Avatar, Box, Button, Container, Stack, Typography } from '@mui/material';

import { MatchStatus } from 'constants/tournament-fixtures';
import { Score, TournamentFixture, User } from 'types/tournament-fixtures';
import { displayDate, displayTime } from 'utils/datetime';

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

const MatchStatusBadge = ({ status }: { status: string }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        color:
          status === MatchStatus.SCHEDULED || status === MatchStatus.DONE
            ? 'green'
            : status === MatchStatus.NO_PARTY || status === MatchStatus.SCORE_DONE
              ? 'gray'
              : status === MatchStatus.WALK_OVER
                ? 'red'
                : (theme) => theme.palette.info.main,
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {status === MatchStatus.SCHEDULED && 'SCHEDULED'}

      {status === MatchStatus.NO_PARTY && 'NO PARTY'}

      {status === MatchStatus.WALK_OVER && 'LIVE'}

      {status === MatchStatus.DONE && 'SCORING IN PROGRESS'}

      {status === MatchStatus.SCORE_DONE && 'FINISHED'}

      {status === MatchStatus.NO_SHOW && 'TBD'}
    </Typography>
  );
};

const MatchScore = ({ scores }: { scores: Score[] }) => {
  return (
    <Box>
      {scores.length !== 0 &&
        scores
          .filter((score) => score.set === 'final')
          .map((score, index) => (
            <Typography
              variant="h4"
              fontWeight={600}
              lineHeight={1.5}
              key={index}
            >
              {score.game}
            </Typography>
          ))}
    </Box>
  );
};

export function RoundRobinFixture({ fixture }: { fixture: TournamentFixture }) {
  return (
    <Container maxWidth="lg">
      <Stack
        direction="column"
        gap={6}
        my={5}
      >
        {fixture.roundRobinRounds
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

              {round.seeds.map((match, matchIndex) => (
                <Box key={matchIndex}>
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
                        <strong>Date / Time:</strong> {displayDate(match.date)}, {displayTime(match.time)}
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
                          <CustomPlayer
                            player={match.teams[0].user1}
                            direction="left"
                          />

                          {match.teams[0]?.user2 && (
                            <CustomPlayer
                              player={match.teams[0].user2}
                              direction="left"
                            />
                          )}
                        </Stack>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {match.teams[0].isWinner && (
                            <ArrowRightIcon
                              color="primary"
                              fontSize="large"
                            />
                          )}

                          {match.teams[0]?.scores && <MatchScore scores={match.teams[0].scores} />}
                        </Box>
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
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          {match.teams[1]?.scores && <MatchScore scores={match.teams[1].scores} />}

                          {match.teams[1].isWinner && (
                            <ArrowLeftIcon
                              color="primary"
                              fontSize="large"
                            />
                          )}
                        </Box>

                        <Stack direction="column">
                          <CustomPlayer
                            player={match.teams[1].user1}
                            direction="right"
                          />

                          {match.teams[1]?.user2 && (
                            <CustomPlayer
                              player={match.teams[1].user2}
                              direction="right"
                            />
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
                        {match.teams[0]?.user2 && (
                          <Typography
                            variant="h6"
                            color="green"
                          >
                            {match.teams[0].totalElo} ELO
                          </Typography>
                        )}
                      </Box>

                      <Button
                        variant="contained"
                        color="info"
                        sx={{
                          borderRadius: 0,
                        }}
                      >
                        Details
                      </Button>

                      <Box>
                        {match.teams[0]?.user2 && (
                          <Typography
                            variant="h6"
                            color="green"
                          >
                            {match.teams[1].totalElo} ELO
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
      </Stack>
    </Container>
  );
}
