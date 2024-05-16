import { Alert, Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import GroupPlayoffFixture from 'components/Common/Fixtures/GroupPlayoffFixture';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { RoundRobinFixture } from 'components/Common/Fixtures/RoundRobinFixture';
import { ModalKey } from 'constants/modal';
import { TournamentFormat, TournamentPhase } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/shared/fixture';
import { showModal } from 'store/slice/modalSlice';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';
import { checkGeneratedFixture } from 'utils/tournament';

import SetupFixture from './SetupFixture';

export default function Fixtures() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [getFixtureRequest, { isLoading: fetchingFixture, data: fixture }] = useLazyGetTournamentFixtureQuery();

  const tournamentData = useAppSelector(selectTournamentData);

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
          await getFixtureRequest(tournamentData.id).unwrap();
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getFixtureRequest, tournamentData, navigate, isCreator]);

  if (fetchingFixture) return <CenterLoading />;

  if (isCreator) {
    if (tournamentData.phase === TournamentPhase.NEW) {
      return (
        <Box mt={4}>
          <Alert severity="info">
            You need to publish the tournament first in the{' '}
            <Link to={`/tournaments/${tournamentData.id}/info`}>Information</Link> tab.
          </Alert>
        </Box>
      );
    } else if (tournamentData.phase === TournamentPhase.PUBLISHED) {
      return (
        <Box mt={4}>
          <Alert severity="info">
            You need to finalize applicant list in the{' '}
            <Link to={`/tournaments/${tournamentData.id}/participants`}>Participants</Link> tab.
          </Alert>
        </Box>
      );
    } else {
      const shouldRenderSetupForm =
        tournamentData.phase === TournamentPhase.FINALIZED_APPLICANTS && fixture?.status === FixtureStatus.NEW;

      return (
        <Box mt={4}>
          {shouldRenderSetupForm && <SetupFixture />}
          {fixture && (
            <>
              {fixture.format === TournamentFormat.KNOCKOUT && <KnockoutFixtures rounds={fixture.knockoutRounds!} />}
              {fixture.format === TournamentFormat.ROUND_ROBIN && (
                <RoundRobinFixture rounds={fixture.roundRobinRounds!} />
              )}
              {fixture.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}
            </>
          )}
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
  }

  if (!fixture || (fixture.status && [FixtureStatus.NEW, FixtureStatus.DRAFT].includes(fixture.status)))
    return (
      <Box mt={4}>
        <Alert severity="info">In the process of generating fixtures. Please wait for the organizers to publish.</Alert>
      </Box>
    );

  return (
    <Box mt={4}>
      {fixture?.format === TournamentFormat.KNOCKOUT && <KnockoutFixtures rounds={fixture.knockoutRounds!} />}
      {fixture?.format === TournamentFormat.ROUND_ROBIN && <RoundRobinFixture rounds={fixture.roundRobinRounds!} />}
      {fixture?.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}
    </Box>
  );
}
