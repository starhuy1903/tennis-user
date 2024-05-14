import { Alert, Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import GroupPlayoffFixture from 'components/Common/Fixtures/GroupPlayoffFixture';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { RoundRobinFixture } from 'components/Common/Fixtures/RoundRobinFixture';
import { ModalKey } from 'constants/modal';
import { TournamentFormat } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/tournamentFixtureApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { checkTournamentRole, selectTournament } from 'store/slice/tournamentSlice';
import { TournamentFixture } from 'types/tournament-fixtures';
import { checkGeneratedFixture } from 'utils/tournament';

import SetupFixture from './SetupFixture';

export default function Fixtures() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [fixture, setFixture] = useState<TournamentFixture | null>(null);

  const [getFixture, { isLoading }] = useLazyGetTournamentFixtureQuery();

  const tournamentData = useAppSelector(selectTournament);

  const { isCreator } = useAppSelector(checkTournamentRole);

  const handleAddMatch = () => {
    dispatch(
      showModal(ModalKey.ADD_MATCH, {
        tournamentId: tournamentData.id,
        participantType: tournamentData.participantType,
      })
    );
  };

  useEffect(() => {
    (async () => {
      if (isCreator || checkGeneratedFixture(tournamentData.phase)) {
        try {
          const res = await getFixture(tournamentData.id).unwrap();
          setFixture(res);
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getFixture, tournamentData, navigate, isCreator]);

  if (isLoading) return <CenterLoading />;

  if (
    !isCreator &&
    (!fixture || (fixture?.status && [FixtureStatus.NEW, FixtureStatus.DRAFT].includes(fixture.status)))
  )
    return (
      <Box mt={4}>
        <Alert severity="info">In the process of generating fixtures. Please wait for the organizers to publish.</Alert>
      </Box>
    );

  return (
    <Box mt={4}>
      {isCreator && fixture?.status === FixtureStatus.NEW && <SetupFixture />}
      {fixture?.format === TournamentFormat.KNOCKOUT && <KnockoutFixtures rounds={fixture.knockoutRounds!} />}
      {fixture?.format === TournamentFormat.ROUND_ROBIN && <RoundRobinFixture rounds={fixture.roundRobinRounds!} />}
      {fixture?.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}

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
