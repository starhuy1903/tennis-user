import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Avatar, Box, Container, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

import { FormatDateTime } from 'constants/datetime';
// import ReactPlayer from 'react-player/youtube';
import { MatchStatus } from 'constants/tournament-fixtures';
import { FinalScore, Match, Player, Score, Team } from 'types/tournament-fixtures';
import { displayDateTime, displayHour } from 'utils/datetime';

import { Timer } from '../Timer';
import { MatchStatusBadge } from './MatchStatusBadge';

type TeamType = 1 | 2;

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

const CustomPlayer = ({ player, isWinner }: { player: Player; isWinner: boolean }) => {
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
        isWinner={!!team.isWinner}
      />

      {team?.user2 && (
        <>
          <CustomPlayer
            player={team.user2}
            isWinner={!!team.isWinner}
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

const MatchScore = ({ finalScore, team }: { finalScore: FinalScore; team: TeamType }) => {
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

const TeamCell = ({ team }: { team: Team }) => {
  return (
    <TableCell sx={{ display: 'flex', flexDirection: 'column', gap: 2, align: 'center' }}>
      <Typography
        variant="body1"
        align="center"
      >
        {team.user1.name}
      </Typography>
      {team?.user2 && (
        <Typography
          variant="body1"
          align="center"
        >
          {team.user2.name}
        </Typography>
      )}
    </TableCell>
  );
};

const ScoreCell = ({ scores, team }: { scores: Score[]; team: TeamType }) => {
  return (
    <>
      {scores.length !== 0 ? (
        scores.map((score, scoreIndex) => (
          <TableCell
            key={scoreIndex}
            align="center"
          >
            {score[`team${team}`]}
            {score[`tiebreakTeam${team}`] && (
              <sup
                style={{
                  fontSize: 10,
                  marginLeft: 2,
                }}
              >
                {score[`tiebreakTeam${team}`]}
              </sup>
            )}
          </TableCell>
        ))
      ) : (
        <TableCell align="center">-</TableCell>
      )}
    </>
  );
};

const ScoreTable = ({ match }: { match: Match }) => {
  return (
    <Table sx={{ minWidth: 650, tableLayout: 'fixed' }}>
      <TableBody>
        <TableRow>
          <TableCell
            sx={{
              align: 'center',
              fontWeight: 'bold',
            }}
          >
            Team 1
          </TableCell>

          <TeamCell team={match.teams.team1!} />

          <ScoreCell
            scores={match.scores}
            team={1}
          />

          <TableCell
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {match.finalScore.team1}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell
            sx={{
              align: 'center',
              fontWeight: 'bold',
            }}
          >
            Team 2
          </TableCell>

          <TeamCell team={match.teams.team2!} />

          <ScoreCell
            scores={match.scores}
            team={2}
          />

          <TableCell
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {match.finalScore.team2}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell
            sx={{
              align: 'center',
              fontWeight: 'bold',
            }}
          >
            Match Time
          </TableCell>
          <TableCell align="center" />

          {match.scores.length !== 0 ? (
            match.scores.map((score, scoreIndex) => (
              <TableCell
                key={scoreIndex}
                align="center"
              >
                {displayHour(score.time)}
              </TableCell>
            ))
          ) : (
            <TableCell align="center">-</TableCell>
          )}

          <TableCell align="center" />
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
            <strong>Date / Time:</strong>{' '}
            {displayDateTime({ dateTime: match.date, targetFormat: FormatDateTime.DATE_2 })},{' '}
            {displayDateTime({
              dateTime: match.date,
              formatSpecification: FormatDateTime.FULL_TIME,
              targetFormat: FormatDateTime.MERIDIEM_HOUR,
            })}
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
          <CustomTeam team={match.teams.team1!} />

          <Stack alignItems="center">
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <MatchScore
                finalScore={match.finalScore}
                team={1}
              />

              <MatchStatusBadge status={match.status} />

              <MatchScore
                finalScore={match.finalScore}
                team={2}
              />
            </Box>

            {match.status === MatchStatus.WALK_OVER && <Timer date={match.date} />}
          </Stack>

          <CustomTeam team={match.teams.team2!} />
        </Box>

        {/* Livestream */}
        {/* {match.videoUrl && (
          <>
            <MatchHeader>
              <Typography
                variant="body1"
                color="white"
                fontWeight="bold"
              >
                {match.status === MatchStatus.WALK_OVER ? 'Live Video' : 'Match Video'}
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
        )} */}

        <MatchHeader>
          <Typography
            variant="body1"
            color="white"
            fontWeight="bold"
          >
            Scores
          </Typography>
        </MatchHeader>

        <ScoreTable match={match} />
      </Box>
    </Container>
  );
}
