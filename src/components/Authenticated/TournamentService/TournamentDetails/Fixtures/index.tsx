import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { ModalKey } from 'constants/modal';
import { TournamentFormat } from 'constants/tournament';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/tournamentFixtureApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { TournamentFixture } from 'types/tournament-fixtures';

import GroupPlayoffFixture from './GroupPlayoffFixture';
import KnockoutFixtures from './KnockoutFixture';
import { RoundRobinFixture } from './RoundRobinFixture';
import SetupFixture from './SetupFixture';

export default function Fixtures() {
  const dispatch = useAppDispatch();
  const tournament = useAppSelector((state) => state.tournament.data);
  const [fixture, setFixture] = useState<TournamentFixture | null>(null);
  const { tournamentId } = useParams();
  const [getFixture, { isLoading }] = useLazyGetTournamentFixtureQuery();

  const handleAddMatch = () => {
    if (!tournament) return;

    dispatch(
      showModal(ModalKey.ADD_MATCH, {
        tournamentId: tournament.id,
        participantType: tournament.participantType,
      })
    );
  };

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

  if (isLoading || !tournament) return <CenterLoading />;

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
      {fixture.format === TournamentFormat.KNOCKOUT && <KnockoutFixtures fixture={fixture} />}
      {fixture.format === TournamentFormat.ROUND_ROBIN && <RoundRobinFixture fixture={fixture} />}
      {fixture.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}

      {/* Create match button */}
      <Box>
        <Button
          variant="text"
          onClick={handleAddMatch}
        >
          Add match
        </Button>
      </Box>
    </Box>
  );
}
