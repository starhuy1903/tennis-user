import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import RoundRobinFixture from 'components/Common/Fixtures/RoundRobin';
import NoData from 'components/Common/NoData';
import { TournamentFormat } from 'constants/tournament';
import { useLazyGetGroupTournamentFixtureQuery } from 'store/api/group/groupTournamentFixtureApiSlice';
import { selectGroup } from 'store/slice/groupSlice';

export default function Fixtures() {
  const groupData = useAppSelector(selectGroup);
  const { tournamentId } = useParams();

  const [getGroupFixture, { isLoading, data: fixture }] = useLazyGetGroupTournamentFixtureQuery();

  useEffect(() => {
    (async () => {
      try {
        await getGroupFixture({
          groupId: groupData.id,
          tournamentId: parseInt(tournamentId!),
        }).unwrap();
      } catch (error) {
        // handled error
      }
    })();
  }, [getGroupFixture, groupData.id, tournamentId]);

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
