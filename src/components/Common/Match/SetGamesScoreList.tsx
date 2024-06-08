import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography } from '@mui/material';

import { MatchMetaData } from 'types/match';
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

  return (
    <Stack spacing={2}>
      {sets.map((set, setIndex) => {
        return (
          <Stack key={set.id}>
            <Accordion>
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
                  <Typography variant="h5">Set {setIndex + 1}</Typography>
                  <Box
                    marginLeft={4}
                    display="flex"
                    flexDirection="row"
                  >
                    {`${set.setFinalScore.team1} - ${set.setFinalScore.team2}`}
                  </Box>
                </Box>
                <Divider />
              </AccordionSummary>
              <AccordionDetails>
                {set.games.map((game, gameIndex) => {
                  return (
                    <GameScore
                      key={game.id}
                      game={game}
                      title={`Game ${gameIndex + 1}`}
                      winnerName={getWinnerName(match.team1, match.team2, game.teamWinId)}
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
