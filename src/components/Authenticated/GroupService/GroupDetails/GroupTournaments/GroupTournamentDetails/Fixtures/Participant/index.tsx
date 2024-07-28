import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import { WrapperContainer } from 'components/Authenticated/TournamentService/TournamentDetails/Common/StyledComponent';
import CenterLoading from 'components/Common/CenterLoading';
import KnockoutGroupFixture from 'components/Common/Fixtures/KnockoutGroup';
import RoundRobinGroupFixture from 'components/Common/Fixtures/RoundRobinGroup';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useLazyGetGroupTournamentFixtureQuery } from 'store/api/group/group-tournaments/shared/fixture';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournamentData } from 'store/slice/groupTournamentSlice';
import {
  isGeneratedNewKnockoutGroupFixture,
  isGeneratedNewRoundRobinGroupFixture,
} from 'types/group-tournament-fixtures';
import { checkGeneratedFixture } from 'utils/group-tournament';

export default function ParticipantFixture() {
  const navigate = useNavigate();

  const [getFixtureRequest, { isLoading: fetchingFixture, data: fixture }] = useLazyGetGroupTournamentFixtureQuery();

  const groupData = useAppSelector(selectGroup);
  const tournamentData = useAppSelector(selectGroupTournamentData);

  useEffect(() => {
    (async () => {
      if (checkGeneratedFixture(tournamentData.phase)) {
        try {
          await getFixtureRequest({
            groupId: groupData.id,
            tournamentId: tournamentData.id,
          }).unwrap();
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getFixtureRequest, tournamentData, navigate, groupData.id]);

  if (fetchingFixture) return <CenterLoading />;

  if (!fixture || [FixtureStatus.NEW, FixtureStatus.DRAFT].includes(fixture.status))
    return (
      <WrapperContainer>
        <Alert severity="info">In the process of generating fixtures. Please wait for the organizers to publish.</Alert>
      </WrapperContainer>
    );

  return (
    <WrapperContainer>
      {isGeneratedNewKnockoutGroupFixture(fixture) && <KnockoutGroupFixture rounds={fixture.knockoutGroup.rounds} />}

      {isGeneratedNewRoundRobinGroupFixture(fixture) && (
        <RoundRobinGroupFixture rounds={fixture.roundRobinGroups[0].rounds} />
      )}
    </WrapperContainer>
  );
}
