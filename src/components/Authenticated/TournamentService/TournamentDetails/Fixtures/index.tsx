import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import GroupPlayoffFixture from 'components/Common/Fixtures/GroupPlayoffFixture';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { RoundRobinFixture } from 'components/Common/Fixtures/RoundRobinFixture';
import NoData from 'components/Common/NoData';
import { TournamentFormat } from 'constants/tournament';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/tournamentFixtureApiSlice';
import { TournamentFixture } from 'types/tournament-fixtures';

import SetupFixture from './SetupFixture';

export default function Fixtures() {
  const [fixture, setFixture] = useState<TournamentFixture | null>(null);
  const { tournamentId } = useParams();
  const [getFixture, { isLoading }] = useLazyGetTournamentFixtureQuery();
  useEffect(() => {
    (async () => {
      try {
        const res = await getFixture(parseInt(tournamentId!)).unwrap();
        setFixture(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getFixture, tournamentId]);

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
      <SetupFixture />
      {fixture.format === TournamentFormat.KNOCKOUT && <KnockoutFixtures rounds={fixture.knockoutRounds!} />}
      {fixture.format === TournamentFormat.ROUND_ROBIN && <RoundRobinFixture rounds={fixture.roundRobinRounds!} />}
      {fixture.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}
    </Box>
  );
}
