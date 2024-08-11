import { Box } from '@mui/material';
import { useAppSelector } from 'store';

import WinnerTeam from 'components/Authenticated/TournamentService/TournamentDetails/Standing/WinnerTeam';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { GroupTournamentPhase } from 'constants/group-tournament';
import { selectGroupTournamentData } from 'store/slice/groupTournamentSlice';
import { KnockoutStanding } from 'types/tournament/standing';

type KnockoutStandingBracketProps = {
  standingData: KnockoutStanding;
};

export default function KnockoutStandingBracket({ standingData }: KnockoutStandingBracketProps) {
  const tournamentData = useAppSelector(selectGroupTournamentData);
  const numberOfRounds = standingData.standings.rounds.length;
  const finalMatch = standingData.standings.rounds[numberOfRounds - 1].matches[0];
  const teamWinner = finalMatch.teamWinnerId === finalMatch.teamId1 ? finalMatch.teams.team1 : finalMatch.teams.team2;

  return (
    <Box my={4}>
      {tournamentData.phase === GroupTournamentPhase.COMPLETED && (
        <WinnerTeam
          name1={teamWinner.user1.name}
          image1={teamWinner.user1.image}
        />
      )}
      <KnockoutFixtures
        rounds={standingData.standings.rounds}
        isStandingTabs
      />
    </Box>
  );
}
