import { Alert, Box, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import GroupPlayoffFixture from 'components/Common/Fixtures/GroupPlayoffFixture';
import RoundRobinFixture from 'components/Common/Fixtures/RoundRobin';
import { TournamentFormat, TournamentPhase } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useClearDraftFixtureMutation, useSaveFixtureMutation } from 'store/api/tournament/creator/fixture';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/shared/fixture';
import { checkTournamentRole, selectTournamentData, shouldRefreshTournamentData } from 'store/slice/tournamentSlice';
import { FixturePayload, TournamentFixture } from 'types/tournament-fixtures';
import { showSuccess } from 'utils/toast';
import { checkGeneratedFixture } from 'utils/tournament';

import SetupFixture from './SetupFixture';

export default function Fixtures() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [fixture, setFixture] = useState<TournamentFixture | null>(null);
  const [fixtureConfig, setFixtureConfig] = useState<FixturePayload | null>(null);
  const [getFixtureRequest, { isLoading: fetchingFixture }] = useLazyGetTournamentFixtureQuery();
  const [saveFixtureRequest, { isLoading: savingFixture }] = useSaveFixtureMutation();
  const [clearDraftFixtureRequest, { isLoading: clearingDraft }] = useClearDraftFixtureMutation();

  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);

  const handleSaveFixture = useCallback(
    async (type: 'draft' | 'publish') => {
      try {
        if (!fixture || !fixtureConfig) return;
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
      setFixture({ status: FixtureStatus.NEW } as TournamentFixture);
    } catch (error) {
      // handled error
    }
  }, [clearDraftFixtureRequest, tournamentData.id]);

  useEffect(() => {
    (async () => {
      if (isCreator || checkGeneratedFixture(tournamentData.phase)) {
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
            } as FixturePayload);
          }
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
          {shouldRenderSetupForm && (
            <SetupFixture
              fixtureConfig={fixtureConfig}
              setFixtureData={setFixture}
              setFixtureConfig={setFixtureConfig}
            />
          )}

          {fixture?.id && (
            <Box sx={{ overflowX: 'hidden', border: '1px solid', pY: 2 }}>
              <Box sx={{ overflow: 'scroll' }}>
                {/* <Typography>This is sample fixture.</Typography> */}
                {/* {fixture.format === TournamentFormat.KNOCKOUT && (
                  <KnockoutFixtures rounds={fixture.knockoutGroup?.rounds} />
                )} */}
                {fixture.format === TournamentFormat.ROUND_ROBIN && (
                  <RoundRobinFixture
                    rounds={fixture?.roundRobinGroups?.[0].rounds}
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
  }

  if (!fixture || (fixture.status && [FixtureStatus.NEW, FixtureStatus.DRAFT].includes(fixture.status)))
    return (
      <Box mt={4}>
        <Alert severity="info">In the process of generating fixtures. Please wait for the organizers to publish.</Alert>
      </Box>
    );

  return (
    <Box mt={4}>
      {/* {fixture?.format === TournamentFormat.KNOCKOUT && <KnockoutFixtures rounds={fixture.knockoutRounds!} />} */}
      {/* {fixture?.format === TournamentFormat.ROUND_ROBIN && <RoundRobinFixture rounds={fixture.roundRobinRounds!} />} */}
      {fixture?.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}
    </Box>
  );
}
