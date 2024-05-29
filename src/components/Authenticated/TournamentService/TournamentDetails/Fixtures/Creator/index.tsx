import { Alert, Box, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import GroupPlayoffFixture from 'components/Common/Fixtures/GroupPlayoffFixture';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import RoundRobinFixture from 'components/Common/Fixtures/RoundRobin';
import { TournamentFormat, TournamentPhase } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useClearDraftFixtureMutation, useSaveFixtureMutation } from 'store/api/tournament/creator/fixture';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/shared/fixture';
import { selectTournamentData, shouldRefreshTournamentData } from 'store/slice/tournamentSlice';
import {
  CreateFixtureRequest,
  FixtureResponse,
  isGeneratedNewFixtureType,
  isGeneratedNewKnockoutFixture,
  isGeneratedNewRoundRobinFixture,
} from 'types/tournament-fixtures';
import { showSuccess } from 'utils/toast';

import SetupFixture from './SetupFixture';

export default function CreatorFixture() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fixture, setFixture] = useState<FixtureResponse | null>(null);
  const [fixtureConfig, setFixtureConfig] = useState<CreateFixtureRequest | null>(null);
  const [getFixtureRequest, { isLoading: fetchingFixture }] = useLazyGetTournamentFixtureQuery();
  const [saveFixtureRequest, { isLoading: savingFixture }] = useSaveFixtureMutation();
  const [clearDraftFixtureRequest, { isLoading: clearingDraft }] = useClearDraftFixtureMutation();

  const tournamentData = useAppSelector(selectTournamentData);

  const handleSaveFixture = useCallback(
    async (type: 'draft' | 'publish') => {
      try {
        if (!fixture || !fixtureConfig || !isGeneratedNewFixtureType(fixture)) return;
        const { participantType, ...submittedFixture } = fixture;
        const submitData = {
          ...submittedFixture,
          ...fixtureConfig,
          status: type === 'draft' ? FixtureStatus.DRAFT : FixtureStatus.PUBLISHED,
        };

        const res = await saveFixtureRequest({
          tournamentId: tournamentData.id,
          body: { ...submitData, id: String(submitData.id) },
        }).unwrap();
        setFixture(res);
        if (type === 'publish') {
          dispatch(shouldRefreshTournamentData(true));
          showSuccess('Saved and published fixture successfully.');
        } else {
          showSuccess('Saved draft fixture successfully.');
        }
      } catch (error) {
        // handled error
      }
    },
    [dispatch, fixture, fixtureConfig, saveFixtureRequest, tournamentData.id]
  );

  const handleClearDraft = useCallback(async () => {
    try {
      await clearDraftFixtureRequest(tournamentData.id).unwrap();
      showSuccess('Clear draft fixture successfully.');
      setFixture({ status: FixtureStatus.NEW });
    } catch (error) {
      // handled error
    }
  }, [clearDraftFixtureRequest, tournamentData.id]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFixtureRequest(tournamentData.id).unwrap();
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
          } as CreateFixtureRequest);
        }
      } catch (error) {
        // handled error
      }
    })();
  }, [getFixtureRequest, tournamentData, navigate]);

  if (fetchingFixture) return <CenterLoading />;

  if (tournamentData.phase === TournamentPhase.NEW) {
    return (
      <Box mt={4}>
        <Alert severity="info">
          You need to publish the tournament first in the{' '}
          <Link to={`/tournaments/${tournamentData.id}/info`}>Information</Link> tab.
        </Alert>
      </Box>
    );
  }

  if (tournamentData.phase === TournamentPhase.PUBLISHED) {
    return (
      <Box mt={4}>
        <Alert severity="info">
          You need to finalize applicant list in the{' '}
          <Link to={`/tournaments/${tournamentData.id}/participants`}>Participants</Link> tab.
        </Alert>
      </Box>
    );
  }

  const shouldRenderSetupForm =
    tournamentData.phase === TournamentPhase.FINALIZED_APPLICANTS && fixture?.status === FixtureStatus.NEW;

  return (
    <Box mt={4}>
      {shouldRenderSetupForm && (
        <SetupFixture
          fixtureConfig={fixtureConfig}
          setFixtureData={setFixture}
          setFixtureConfig={setFixtureConfig}
        />
      )}

      {fixture && isGeneratedNewFixtureType(fixture) && (
        <Box sx={{ overflowX: 'hidden', border: '1px solid', pY: 2 }}>
          <Box sx={{ overflow: 'scroll' }}>
            {isGeneratedNewKnockoutFixture(fixture) && (
              <KnockoutFixtures
                rounds={fixture.knockoutGroup.rounds}
                setFixtureData={setFixture}
              />
            )}
            {isGeneratedNewRoundRobinFixture(fixture) && (
              <RoundRobinFixture
                rounds={fixture.roundRobinGroups[0].rounds}
                setFixtureData={setFixture}
              />
            )}
            {fixture.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}
          </Box>
          {tournamentData.phase === TournamentPhase.FINALIZED_APPLICANTS && (
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
                  Clear draft
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => handleSaveFixture('draft')}
                disabled={savingFixture || clearingDraft}
              >
                Save as a draft
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
