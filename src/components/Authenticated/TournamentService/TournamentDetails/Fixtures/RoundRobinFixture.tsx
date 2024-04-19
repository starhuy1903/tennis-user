import { Avatar, Box, Button, Container, Stack, Typography } from '@mui/material';

import { MatchStatus } from 'constants/tournament-fixtures';
import { TournamentFixture } from 'types/tournament-fixtures';
import { displayDate, displayTime } from 'utils/datetime';

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
              {round.matches.map((match, matchIndex) => (
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
                      }}
                    >
                      <Typography
                        variant="caption"
                        color="gray"
                      >
                        <strong>Date / Time:</strong> {displayDate(match.date)}, {displayTime(match.time)}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          px: 4,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                          }}
                        >
                          <Avatar
                            src={match.player1.image}
                            alt={match.player1.name}
                            sx={{ width: '80px', height: '80px' }}
                          />

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
                              {match.player1.name}
                            </Typography>

                            <Typography variant="body2">{match.player1.elo} ELO</Typography>
                          </Box>
                        </Box>

                        <Box>
                          {match.player1.scores &&
                            match.player1.scores
                              .filter((score) => score.set === 'final')
                              .map((score) => (
                                <Typography
                                  variant="h4"
                                  fontWeight={600}
                                  lineHeight={1.5}
                                >
                                  {score.game}
                                </Typography>
                              ))}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          width: '30%',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color:
                              match.status === MatchStatus.SCHEDULED || match.status === MatchStatus.DONE
                                ? 'green'
                                : match.status === MatchStatus.NO_PARTY || match.status === MatchStatus.SCORE_DONE
                                  ? 'gray'
                                  : match.status === MatchStatus.WALK_OVER
                                    ? 'red'
                                    : (theme) => theme.palette.info.main,
                            fontWeight: 'bold',
                            textAlign: 'center',
                          }}
                        >
                          {match.status === MatchStatus.SCHEDULED && 'SCHEDULED'}

                          {match.status === MatchStatus.NO_PARTY && 'NO PARTY'}

                          {match.status === MatchStatus.WALK_OVER && 'LIVE'}

                          {match.status === MatchStatus.DONE && 'SCORING IN PROGRESS'}

                          {match.status === MatchStatus.SCORE_DONE && 'FINISHED'}

                          {match.status === MatchStatus.NO_SHOW && 'TBD'}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          px: 4,
                        }}
                      >
                        <Box>
                          {match.player2.scores &&
                            match.player2.scores
                              .filter((score) => score.set === 'final')
                              .map((score, scoreIndex) => (
                                <Typography
                                  key={scoreIndex}
                                  variant="h4"
                                  fontWeight={600}
                                  lineHeight={1.5}
                                >
                                  {score.game}
                                </Typography>
                              ))}
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
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
                              {match.player2.name}
                            </Typography>

                            <Typography variant="body2">{match.player2.elo} ELO</Typography>
                          </Box>

                          <Avatar
                            src={match.player2.image}
                            alt={match.player2.name}
                            sx={{ width: '80px', height: '80px' }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        borderTop: '1px solid #E0E0E0',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        variant="contained"
                        color="info"
                        sx={{
                          borderRadius: 0,
                        }}
                      >
                        Details
                      </Button>
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
