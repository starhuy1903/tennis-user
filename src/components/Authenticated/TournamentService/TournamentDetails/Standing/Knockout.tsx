import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { KnockoutStanding } from 'types/tournament/standing';

type KnockoutStandingBracketProps = {
  standingData: KnockoutStanding;
};

export default function KnockoutStandingBracket({ standingData }: KnockoutStandingBracketProps) {
  return <KnockoutFixtures rounds={standingData.standings.rounds} />;
}
