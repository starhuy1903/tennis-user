import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Avatar, Box, Container, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

import { MatchStatus } from 'constants/tournament-fixtures';
import { Match, Team, User } from 'types/tournament-fixtures';
import { displayDate, displayDistanceFromNow, displayHour, displayTime } from 'utils/datetime';

const MatchHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: (theme) => theme.palette.primary.main,
        px: 2,
        py: 1,
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};

const CustomPlayer = ({ player, isWinner }: { player: User; isWinner: boolean | null }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          border: '1px solid #E0E0E0',
          borderRadius: 1,
          padding: 0.5,
        }}
      >
        <Avatar
          src={player.image}
          alt={player.name}
          sx={{ width: '80px', height: '80px' }}
        />
      </Box>

      <Typography
        variant="body1"
        sx={{
          mt: 0.5,
          fontWeight: isWinner ? 'bold' : 'normal',
        }}
      >
        {player.name}
      </Typography>

      <Typography variant="caption">{player.elo} ELO</Typography>
    </Box>
  );
};

const CustomTeam = ({ team }: { team: Team }) => {
  return (
    <Stack
      direction="column"
      gap={2}
    >
      <CustomPlayer
        player={team.user1}
        isWinner={team.isWinner}
      />

      {team?.user2 && (
        <>
          <CustomPlayer
            player={team.user2}
            isWinner={team.isWinner}
          />

          <Typography
            variant="h6"
            color="green"
          >
            {team.totalElo} ELO
          </Typography>
        </>
      )}
    </Stack>
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

const MatchScore = ({ team, direction }: { team: Team; direction: 'left' | 'right' }) => {
  return (
    <>
      {team.isWinner && direction === 'left' && (
        <ArrowRightIcon
          color="primary"
          fontSize="large"
          sx={{
            position: 'absolute',
            left: '-40px',
          }}
        />
      )}

      {team.scores &&
        team.scores.length !== 0 &&
        team.scores
          .filter((score) => score.set === 'final')
          .map((score, index) => (
            <Typography
              variant="h3"
              fontWeight={600}
              lineHeight={1.5}
              key={index}
            >
              {score.game}
            </Typography>
          ))}

      {team.isWinner && direction === 'right' && (
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

const Timer = ({ date }: { date: string }) => {
  const [time, setTime] = useState(displayDistanceFromNow(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(displayDistanceFromNow(date));
    }, 1000);
    return () => clearInterval(interval);
  }, [date]);

  return <Typography variant="h6">{time}</Typography>;
};

const ScoreTable = ({ teams }: { teams: Team[] }) => {
  return (
    <Table sx={{ minWidth: 650 }}>
      <TableBody>
        {teams.map(({ user1, user2, scores }, teamIndex) => (
          <TableRow key={teamIndex}>
            <TableCell sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography
                variant="body1"
                align="center"
              >
                {user1.name}
              </Typography>
              {user2 && (
                <Typography
                  variant="body1"
                  align="center"
                >
                  {user2.name}
                </Typography>
              )}
            </TableCell>

            <TableCell />

            {scores
              ?.slice()
              .reverse()
              .map((score, scoreIndex) => (
                <TableCell
                  key={scoreIndex}
                  sx={{
                    textAlign: 'center',
                    fontWeight: score.set === 'final' ? 'bold' : 'normal',
                  }}
                >
                  {score.game}
                </TableCell>
              ))}
          </TableRow>
        ))}
        <TableRow>
          <TableCell />
          <TableCell>Match Time</TableCell>
          {teams[0].scores
            ?.slice()
            .reverse()
            .map((score, scoreIndex) => (
              <TableCell
                align="center"
                key={scoreIndex}
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {displayHour(score.min!)}
              </TableCell>
            ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default function MatchDetails({ match }: { match: Match }) {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          bgcolor: 'white',
        }}
      >
        <MatchHeader>
          <Typography
            variant="caption"
            color="white"
          >
            <strong>Date / Time:</strong> {displayDate(match.date)}, {displayTime(match.time)}
          </Typography>

          <Typography
            variant="caption"
            color="white"
          >
            <strong>Venue:</strong> {match.venue}
          </Typography>
        </MatchHeader>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 8,
            py: 2,
          }}
        >
          <CustomTeam team={match.teams[0]} />

          <Stack
            direction="column"
            alignItems="center"
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {match.teams[0]?.scores && (
                <MatchScore
                  team={match.teams[0]}
                  direction="left"
                />
              )}

              <MatchStatusBadge status={match.status} />

              {match.teams[1]?.scores && (
                <MatchScore
                  team={match.teams[1]}
                  direction="right"
                />
              )}
            </Box>

            {match.status === MatchStatus.WALK_OVER && <Timer date={match.date} />}
          </Stack>

          <CustomTeam team={match.teams[1]} />
        </Box>

        {/* Just demo for livestream feature */}
        {match.videoUrl && (
          <>
            <MatchHeader>
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
              >
                {match.status === MatchStatus.WALK_OVER ? 'Live Stream' : 'Match Video'}
              </Typography>
            </MatchHeader>

            <Box
              sx={{
                py: 2,
                px: 4,
              }}
            >
              <ReactPlayer
                width="100%"
                controls={true}
                url={match.videoUrl}
              />
            </Box>
          </>
        )}

        <MatchHeader>
          <Typography
            variant="body1"
            color="white"
            fontWeight="bold"
          >
            Scores
          </Typography>
        </MatchHeader>

        <ScoreTable teams={match.teams} />
      </Box>
    </Container>
  );
}
