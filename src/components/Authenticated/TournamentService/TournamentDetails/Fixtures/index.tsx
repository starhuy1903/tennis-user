import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { TournamentFormat } from 'constants/tournament';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/tournamentFixtureApiSlice';
import { TournamentFixture } from 'types/tournament-fixtures';

import KnockoutFixtures from './KnockoutFixture';

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

  if (!fixture) return null;

  if (fixture.format === TournamentFormat.KNOCKOUT) {
    return <KnockoutFixtures fixture={fixture} />;
  }
  return <Box>Round Robin Fixtures</Box>;
}
