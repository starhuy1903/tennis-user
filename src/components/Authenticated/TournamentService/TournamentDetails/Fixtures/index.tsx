import { Alert, Box, Button } from '@mui/material';
import produce from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import GroupPlayoffFixture from 'components/Common/Fixtures/GroupPlayoffFixture';
import RoundRobinFixture from 'components/Common/Fixtures/RoundRobin';
import { TournamentFormat, TournamentPhase } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import { useSaveFixtureMutation } from 'store/api/tournament/creator/fixture';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/shared/fixture';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';
import { FixturePayload, TournamentFixture } from 'types/tournament-fixtures';
import { showSuccess } from 'utils/toast';
import { checkGeneratedFixture } from 'utils/tournament';

import SetupFixture from './SetupFixture';

export default function Fixtures() {
  const navigate = useNavigate();

  const [fixture, setFixture] = useState<TournamentFixture | null>(null);
  const [fixtureConfig, setFixtureConfig] = useState<FixturePayload | null>(null);
  const [getFixtureRequest, { isLoading: fetchingFixture }] = useLazyGetTournamentFixtureQuery();
  const [saveFixtureRequest, { isLoading: savingFixture }] = useSaveFixtureMutation();

  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);

  const handleUpdateFixture = useCallback((match: any) => {
    setFixture((prev) => {
      if (prev) {
        const updatedGroups = produce(prev.roundRobinGroups, (draftGroups) => {
          draftGroups?.[0].rounds.forEach((round) => {
            round.matches.forEach((m) => {
              if (m.id === match.id) {
                m.title = match.name;
                m.matchStartDate = match.date;
                m.duration = match.duration;
                m.refereeId = match.refereeId;
              }
            });
          });
        });
        return { ...prev, roundRobinGroups: updatedGroups };
      }
      return prev;
    });
  }, []);

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

        await saveFixtureRequest({
          tournamentId: tournamentData.id,
          body: { ...submitData, id: String(submitData.id) },
        }).unwrap();
        if (type === 'publish') {
          showSuccess('Saved and published fixture successfully.');
        } else {
          showSuccess('Saved draft fixture successfully.');
        }
      } catch (error) {
        // handled error
      }
    },
    [fixture, fixtureConfig, saveFixtureRequest, tournamentData.id]
  );

  useEffect(() => {
    (async () => {
      if (isCreator || checkGeneratedFixture(tournamentData.phase)) {
        try {
          const res = await getFixtureRequest(tournamentData.id).unwrap();
          setFixture(res);
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
              setFixtureData={setFixture}
              setFixtureConfig={setFixtureConfig}
            />
          )}

          {fixture?.id && (
            <Box sx={{ overflowX: 'hidden', border: '1px solid' }}>
              <Box sx={{ overflow: 'scroll' }}>
                {/* <Typography>This is sample fixture.</Typography> */}
                {/* {fixture.format === TournamentFormat.KNOCKOUT && (
                  <KnockoutFixtures rounds={fixture.knockoutGroup?.rounds} />
                )} */}
                {fixture.format === TournamentFormat.ROUND_ROBIN && (
                  <RoundRobinFixture
                    rounds={fixture?.roundRobinGroups?.[0].rounds}
                    onUpdateMatch={handleUpdateFixture}
                  />
                )}
                {fixture.format === TournamentFormat.GROUP_PLAYOFF && <GroupPlayoffFixture fixture={fixture} />}
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                gap={2}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleSaveFixture('draft')}
                  disabled={savingFixture}
                >
                  Save as a draft
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleSaveFixture('publish')}
                  disabled={savingFixture}
                >
                  Save & Publish
                </Button>
              </Box>
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
