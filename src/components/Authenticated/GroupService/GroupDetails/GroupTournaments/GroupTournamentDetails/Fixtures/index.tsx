import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { RoundRobinFixture } from 'components/Common/Fixtures/RoundRobinFixture';
import NoData from 'components/Common/NoData';
import { TournamentFormat } from 'constants/tournament';
import { useLazyGetGroupTournamentFixtureQuery } from 'store/api/group/groupTournamentFixtureApiSlice';
import { GroupTournamentFixture } from 'types/group-tournament-fixtures';

export default function Fixtures() {
  const [fixture, setFixture] = useState<GroupTournamentFixture | null>(null);
  const { groupId, tournamentId } = useParams();

  const [getGroupFixture, { isLoading }] = useLazyGetGroupTournamentFixtureQuery();

  useEffect(() => {
    (async () => {
      try {
        const res = await getGroupFixture({
          groupId: parseInt(groupId!),
          tournamentId: parseInt(tournamentId!),
        }).unwrap();
        setFixture(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getGroupFixture, groupId, tournamentId]);

  if (isLoading) return <CenterLoading />;

  if (!fixture)
    return (
      <Box
        sx={{
          py: 10,
        }}
      >
        <NoData message="The fixture has not been published yet." />
      </Box>
    );

  return (
    <Box>
      {fixture.format === TournamentFormat.KNOCKOUT && <KnockoutFixtures rounds={fixture.rounds} />}
      {fixture.format === TournamentFormat.ROUND_ROBIN && <RoundRobinFixture rounds={fixture.rounds} />}
    </Box>
  );
}
