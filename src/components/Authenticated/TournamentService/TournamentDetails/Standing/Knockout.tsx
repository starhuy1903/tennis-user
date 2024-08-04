import { Box } from '@mui/material';
import { useAppSelector } from 'store';

import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { TournamentPhase } from 'constants/tournament';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { KnockoutStanding } from 'types/tournament/standing';

import WinnerTeam from './WinnerTeam';

type KnockoutStandingBracketProps = {
  standingData: KnockoutStanding;
};

export default function KnockoutStandingBracket({ standingData }: KnockoutStandingBracketProps) {
  const tournamentData = useAppSelector(selectTournamentData);
  const numberOfRounds = standingData.standings.rounds.length;
  const finalMatch = standingData.standings.rounds[numberOfRounds - 1].matches[0];
  const teamWinner = finalMatch.teamWinnerId === finalMatch.teamId1 ? finalMatch.teams.team1 : finalMatch.teams.team2;

  return (
    <Box my={4}>
      {tournamentData.phase === TournamentPhase.COMPLETED && (
        <WinnerTeam
          name1={teamWinner.user1.name}
          image1={teamWinner.user1.image}
          name2={teamWinner.user2?.name}
          image2={teamWinner.user2?.image}
        />
      )}
      <KnockoutFixtures
        rounds={standingData.standings.rounds}
        isStandingTabs
      />
    </Box>
  );
}
