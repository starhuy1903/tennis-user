import { Alert, Box, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import KnockoutGroupFixture from 'components/Common/Fixtures/KnockoutGroup';
import RoundRobinGroupFixture from 'components/Common/Fixtures/RoundRobinGroup';
import { GroupTournamentPhase } from 'constants/group-tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import {
  useClearDraftGroupFixtureMutation,
  useSaveGroupFixtureMutation,
} from 'store/api/group/group-tournaments/creator/fixture';
import { useLazyGetGroupTournamentFixtureQuery } from 'store/api/group/group-tournaments/shared/fixture';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournamentData, shouldRefreshGroupTournamentData } from 'store/slice/groupTournamentSlice';
import {
  CreateGroupFixtureRequest,
  GroupFixtureResponse,
  isGeneratedNewGroupFixtureType,
  isGeneratedNewKnockoutGroupFixture,
  isGeneratedNewRoundRobinGroupFixture,
} from 'types/group-tournament-fixtures';
import { showSuccess } from 'utils/toast';

import SetupFixture from './SetupFixture';

export default function CreatorFixture() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fixture, setFixture] = useState<GroupFixtureResponse | null>(null);
  const [fixtureConfig, setFixtureConfig] = useState<CreateGroupFixtureRequest | null>(null);
  const [getFixtureRequest, { isLoading: fetchingFixture }] = useLazyGetGroupTournamentFixtureQuery();
  const [saveFixtureRequest, { isLoading: savingFixture }] = useSaveGroupFixtureMutation();
  const [clearDraftFixtureRequest, { isLoading: clearingDraft }] = useClearDraftGroupFixtureMutation();

  const groupData = useAppSelector(selectGroup);
  const tournamentData = useAppSelector(selectGroupTournamentData);

  const isNewTournament = tournamentData.phase === GroupTournamentPhase.NEW;

  const handleSaveFixture = useCallback(
    async (type: 'draft' | 'publish') => {
      try {
        if (!fixture || !fixtureConfig || !isGeneratedNewGroupFixtureType(fixture)) return;
        const { participantType, ...submittedFixture } = fixture;
        const submitData = {
          ...submittedFixture,
          ...fixtureConfig,
          status: type === 'draft' ? FixtureStatus.DRAFT : FixtureStatus.PUBLISHED,
        };

        const res = await saveFixtureRequest({
          groupId: groupData.id,
          tournamentId: tournamentData.id,
          body: { ...submitData, id: String(submitData.id) },
          type,
        }).unwrap();
        setFixture(res);
        if (type === 'publish') {
          dispatch(shouldRefreshGroupTournamentData(true));
          showSuccess('Saved and published fixture successfully.');
        } else {
          showSuccess('Saved draft fixture successfully.');
        }
      } catch (error) {
        // handled error
      }
    },
    [dispatch, fixture, fixtureConfig, groupData.id, saveFixtureRequest, tournamentData.id]
  );

  const handleClearDraft = useCallback(async () => {
    try {
      await clearDraftFixtureRequest({
        groupId: groupData.id,
        tournamentId: tournamentData.id,
      }).unwrap();
      showSuccess('Clear draft fixture successfully.');
      setFixture({ status: FixtureStatus.NEW });
    } catch (error) {
      // handled error
    }
  }, [clearDraftFixtureRequest, groupData.id, tournamentData.id]);

  useEffect(() => {
    (async () => {
      if (!isNewTournament) {
        try {
          const res = await getFixtureRequest({
            groupId: groupData.id,
            tournamentId: tournamentData.id,
          }).unwrap();
          setFixture(res);
          if (res.status === FixtureStatus.DRAFT) {
            setFixtureConfig({
              fixtureStartDate: res.fixtureStartDate,
              fixtureEndDate: res.fixtureEndDate,
              matchesStartTime: res.matchesStartTime,
              matchesEndTime: res.matchesEndTime,
              matchDuration: res.matchDuration,
              breakDuration: res.breakDuration,
              venue: res.venue,
            } as CreateGroupFixtureRequest);
          }
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getFixtureRequest, tournamentData, navigate, isNewTournament, groupData.id]);

  if (fetchingFixture) return <CenterLoading />;

  if (isNewTournament) {
    return (
      <Box mt={4}>
        <Alert severity="info">
          You need to publish the tournament first in the{' '}
          <Link to={`/groups/${groupData.id}/tournaments/${tournamentData.id}/info`}>Information</Link> tab.
        </Alert>
      </Box>
    );
  }

  if (tournamentData.phase === GroupTournamentPhase.PUBLISHED) {
    return (
      <Box mt={4}>
        <Alert severity="info">
          You need to finalize the participants in the{' '}
          <Link to={`/groups/${groupData.id}/tournaments/${tournamentData.id}/participants`}>Participants</Link> tab.
        </Alert>
      </Box>
    );
  }

  const shouldRenderSetupForm =
    tournamentData.phase === GroupTournamentPhase.FINALIZED_APPLICANTS && fixture?.status === FixtureStatus.NEW;

  return (
    <Box mt={4}>
      {shouldRenderSetupForm && (
        <SetupFixture
          fixtureConfig={fixtureConfig}
          setFixtureData={setFixture}
          setFixtureConfig={setFixtureConfig}
        />
      )}

      {fixture && isGeneratedNewGroupFixtureType(fixture) && (
        <Box sx={{ overflowX: 'hidden', border: '1px solid', pY: 2 }}>
          <Box sx={{ overflow: 'scroll' }}>
            {isGeneratedNewKnockoutGroupFixture(fixture) && (
              <KnockoutGroupFixture
                rounds={fixture.knockoutGroup.rounds}
                setFixtureData={setFixture}
              />
            )}
            {isGeneratedNewRoundRobinGroupFixture(fixture) && (
              <RoundRobinGroupFixture
                rounds={fixture.roundRobinGroups[0].rounds}
                setFixtureData={setFixture}
              />
            )}
          </Box>
          {tournamentData.phase === GroupTournamentPhase.FINALIZED_APPLICANTS && (
            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
            >
              {fixture.status === FixtureStatus.DRAFT && (
                <Button
                  variant="outlined"
                  onClick={handleClearDraft}
                  disabled={savingFixture || clearingDraft}
                >
                  Reset
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => handleSaveFixture('draft')}
                disabled={savingFixture || clearingDraft}
              >
                Save as draft
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSaveFixture('publish')}
                disabled={savingFixture || clearingDraft}
              >
                Save & Publish
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
