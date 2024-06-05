import { Avatar, Box, Container, Stack, Typography } from '@mui/material';

import { FormatDateTime } from 'constants/datetime';
import { MatchState } from 'constants/match';
// import ReactPlayer from 'react-player/youtube';
import { MatchMetaData } from 'types/match';
import { Player, Team } from 'types/tournament-fixtures';
import { displayDateTime } from 'utils/datetime';

import MainScore from './MainScore';
import SetGamesScoreList from './SetGamesScoreList';

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

export default function MatchDetails({ match }: { match: MatchMetaData }) {
  // console.log({ match });

  return (
    <Container
      maxWidth="md"
      sx={{ mb: 4 }}
    >
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
            {displayDateTime({ dateTime: match.matchStartDate, targetFormat: FormatDateTime.DATE_2 })},{' '}
            {displayDateTime({
              dateTime: match.matchStartDate,
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
          <CustomTeam team={match.team1!} />

          <MainScore match={match} />

          {/* <Stack alignItems="center">
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <MatchScore
                finalScore={match.matchFinalScore}
                team={1}
              />

              <MatchStatusBadge status={match.status} />

              <MatchScore
                finalScore={match.matchFinalScore}
                team={2}
              />
            </Box>

            {match.status === MatchState.WALK_OVER && <Timer date={match.matchStartDate} />}
          </Stack> */}

          <CustomTeam team={match.team2} />
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

        {/* {[MatchState.WALK_OVER, MatchState.SCORE_DONE, MatchState.DONE].includes(match.status) && (
          <>
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
          </>
        )} */}
        <SetGamesScoreList match={match} />
      </Box>
    </Container>
  );
}
