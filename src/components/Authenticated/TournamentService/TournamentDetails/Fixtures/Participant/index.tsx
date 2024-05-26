import { Alert, Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import GroupPlayoffFixture from 'components/Common/Fixtures/GroupPlayoffFixture';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import RoundRobinFixture from 'components/Common/Fixtures/RoundRobin';
import { TournamentFormat } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/shared/fixture';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';
import {
  isGeneratedNewFixtureType,
  isGeneratedNewKnockoutFixture,
  isGeneratedNewRoundRobinFixture,
} from 'types/tournament-fixtures';
import { checkGeneratedFixture } from 'utils/tournament';

export default function ParticipantFixture() {
  const navigate = useNavigate();

  const [getFixtureRequest, { isLoading: fetchingFixture, data: fixture }] = useLazyGetTournamentFixtureQuery();

  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);

  useEffect(() => {
    (async () => {
      if (checkGeneratedFixture(tournamentData.phase)) {
        try {
          await getFixtureRequest(tournamentData.id).unwrap();
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getFixtureRequest, tournamentData, navigate, isCreator]);

  if (fetchingFixture) return <CenterLoading />;

  if (!fixture || [FixtureStatus.NEW, FixtureStatus.DRAFT].includes(fixture.status))
    return (
      <Box mt={4}>
        <Alert severity="info">In the process of generating fixtures. Please wait for the organizers to publish.</Alert>
      </Box>
    );

  return (
    <Box mt={4}>
      {isGeneratedNewKnockoutFixture(fixture) && <KnockoutFixtures rounds={fixture.knockoutGroup.rounds} />}

      {isGeneratedNewRoundRobinFixture(fixture) && <RoundRobinFixture rounds={fixture.roundRobinGroups[0].rounds} />}

      {isGeneratedNewFixtureType(fixture) && fixture.format === TournamentFormat.GROUP_PLAYOFF && (
        <GroupPlayoffFixture fixture={fixture} />
      )}
    </Box>
  );
}
