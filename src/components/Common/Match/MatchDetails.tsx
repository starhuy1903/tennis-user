import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Avatar, Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useCallback, useEffect, useState } from 'react';

import { FormatDateTime } from 'constants/datetime';
import { MatchState } from 'constants/match';
import { useLazyGetMatchDetailsQuery } from 'store/api/tournament/shared/match';
// import ReactPlayer from 'react-player/youtube';
import { MatchMetaData } from 'types/match';
import { Player, Team } from 'types/tournament-fixtures';
import { displayDateTime } from 'utils/datetime';

import CenterLoading from '../CenterLoading';
import MainScore from './MainScore';
import ScoreTable from './ScoreTable';

const MatchHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: deepPurple[300],
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
    <Stack
      sx={{
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
    </Stack>
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

      {team.user2 && (
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

export default function MatchDetails({
  match: matchMetaData,
  onBackToMatchList,
}: {
  match: MatchMetaData;
  onBackToMatchList?: () => void;
}) {
  const [isLive, setIsLive] = useState(matchMetaData.status === MatchState.WALK_OVER);

  const [match, setMatch] = useState<MatchMetaData | null>(matchMetaData);
  const [getMatchDetailsRequest] = useLazyGetMatchDetailsQuery();

  const handleGetMatchData = useCallback(async () => {
    try {
      const res = await getMatchDetailsRequest(matchMetaData.id).unwrap();
      setMatch(res);
      if (res.status !== MatchState.WALK_OVER) {
        setIsLive(false);
      }
    } catch (err) {
      // handled error
    }
  }, [getMatchDetailsRequest, matchMetaData.id]);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        handleGetMatchData();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [handleGetMatchData, isLive]);

  if (!match) return <CenterLoading />;

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
          <Tooltip title="Back">
            <IconButton
              size="small"
              onClick={onBackToMatchList}
            >
              <ArrowBackIcon sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
          >
            <AccessAlarmIcon
              fontSize="small"
              sx={{ color: 'white' }}
            />
            <Typography
              variant="caption"
              color="white"
            >
              {displayDateTime({ dateTime: match.matchStartDate, targetFormat: FormatDateTime.TIME_AND_DATE })}
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
          >
            <PlaceIcon
              fontSize="small"
              sx={{ color: 'white' }}
            />
            <Typography
              variant="caption"
              color="white"
            >
              {match.venue}
            </Typography>
          </Box>
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
          <CustomTeam team={match.team1} />

          <MainScore match={match} />

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
      </Box>
      {[MatchState.WALK_OVER, MatchState.SCORE_DONE, MatchState.DONE].includes(match.status) && (
        <Box mt={2}>
          <ScoreTable
            match={match}
            isSingleTeam={!match.team1.user2}
            isLive={isLive}
          />
        </Box>
      )}
    </Container>
  );
}
