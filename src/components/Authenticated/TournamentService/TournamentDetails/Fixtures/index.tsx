import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { TournamentFormat } from 'constants/tournament';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/tournamentFixtureApiSlice';
import { TournamentFixture } from 'types/tournament-fixtures';

import GroupPlayoffFixture from './GroupPlayoffFixture';
import KnockoutFixtures from './KnockoutFixture';
import { RoundRobinFixture } from './RoundRobinFixture';

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

  if (fixture.format === TournamentFormat.KNOCKOUT) {
    return <KnockoutFixtures fixture={fixture} />;
  } else if (fixture.format === TournamentFormat.ROUND_ROBIN) {
    return <RoundRobinFixture fixture={fixture} />;
  } else {
    return <GroupPlayoffFixture fixture={fixture} />;
  }
}
