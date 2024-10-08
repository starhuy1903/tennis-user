import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

import { MatchMetaData, SetGameStatus } from 'types/match';
import { Team } from 'types/tournament-fixtures';

import GameScore from './GameScore';

const getWinnerName = (team1: Team, team2: Team, winnerTeamId: string) => {
  if (!winnerTeamId) {
    return 'N/A';
  }
  if (team1.id === winnerTeamId) {
    return team1.user1.name;
  }

  if (team2.id === winnerTeamId) {
    return team2.user1.name;
  }

  return 'N/A';
};

type SetGamesScoreList = {
  match: MatchMetaData;
  isLive: boolean;
};

export default function SetGamesScoreList({ match, isLive }: SetGamesScoreList) {
  const { sets } = match;
  const renderSets = useMemo(() => (isLive ? sets.slice().reverse() : sets), [isLive, sets]);

  const currentSet = renderSets[renderSets.length - 1];
  const currentSetId = currentSet?.id;
  const currentGame = currentSet?.games[0];
  const currentGameId = currentGame?.id;

  return (
    <Stack spacing={2}>
      {renderSets.map((set, setIndex) => {
        const isLiveSet = isLive && currentSetId === set.id;
        return (
          <Stack key={set.id}>
            <Accordion defaultExpanded={isLive}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Typography
                    variant="h5"
                    color={isLiveSet ? 'primary' : 'initial'}
                  >
                    Set {setIndex + 1}
                  </Typography>
                  {set.status === SetGameStatus.ENDED && (
                    <Box
                      marginLeft={4}
                      display="flex"
                      flexDirection="row"
                    >
                      {`${set.setFinalScore.team1} - ${set.setFinalScore.team2}`}
                    </Box>
                  )}
                </Box>
                <Divider />
              </AccordionSummary>
              <AccordionDetails>
                {set.games &&
                  set.games
                    .slice()
                    .reverse()
                    .map((game, gameIndex) => {
                      return (
                        <GameScore
                          key={game.id}
                          game={game}
                          title={`Game ${gameIndex + 1}`}
                          winnerName={getWinnerName(match.team1, match.team2, game.teamWinId)}
                          isLatest={isLiveSet && currentGameId === game.id}
                        />
                      );
                    })}
              </AccordionDetails>
            </Accordion>
          </Stack>
        );
      })}
    </Stack>
  );
}
