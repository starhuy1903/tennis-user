import DeleteIcon from '@mui/icons-material/Delete';
import DraftsIcon from '@mui/icons-material/Drafts';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Alert, Box, Button } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import GroupPlayoffFixture from 'components/Common/Fixtures/GroupPlayoffFixture';
import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import RoundRobinFixture from 'components/Common/Fixtures/RoundRobin';
import { TournamentPhase } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';
import {
  useClearDraftFixtureMutation,
  useSaveDraftFixtureMutation,
  useSavePublishFixtureMutation,
} from 'store/api/tournament/creator/fixture';
import { useLazyGetTournamentFixtureQuery } from 'store/api/tournament/shared/fixture';
import { selectTournamentData, shouldRefreshTournamentData } from 'store/slice/tournamentSlice';
import {
  CreateFixtureRequest,
  FixtureResponse,
  isGeneratedNewFixtureType,
  isGeneratedNewGroupPlayoffFixture,
  isGeneratedNewKnockoutFixture,
  isGeneratedNewRoundRobinFixture,
} from 'types/tournament-fixtures';
import { showSuccess } from 'utils/toast';
import { getSubmittedGroupData } from 'utils/tournament';

import { WrapperContainer } from '../../Common/StyledComponent';
import SetupFixture from './SetupFixture';

export default function CreatorFixture() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const [fixture, setFixture] = useState<FixtureResponse | null>(null);
  const [fixtureConfig, setFixtureConfig] = useState<CreateFixtureRequest | null>(null);
  const [getFixtureRequest, { isLoading: fetchingFixture }] = useLazyGetTournamentFixtureQuery();
  const [savePublishFixtureRequest, { isLoading: savingPublishFixture }] = useSavePublishFixtureMutation();
  const [saveDraftFixtureRequest, { isLoading: savingDraftFixture }] = useSaveDraftFixtureMutation();

  const [clearDraftFixtureRequest, { isLoading: clearingDraft }] = useClearDraftFixtureMutation();

  const tournamentData = useAppSelector(selectTournamentData);

  const isNewTournament = tournamentData.phase === TournamentPhase.NEW;

  const handleSaveDraftFixture = useCallback(async () => {
    try {
      if (!fixture || !fixtureConfig || !isGeneratedNewFixtureType(fixture)) return;
      const { participantType, ...restFixture } = fixture;
      const submitData = {
        ...restFixture,
        ...fixtureConfig,
        status: FixtureStatus.DRAFT,
      };

      const res = await saveDraftFixtureRequest({
        tournamentId: tournamentData.id,
        body: { ...submitData, id: String(submitData.id) },
      }).unwrap();
      setFixture(res);

      showSuccess('Saved draft fixture successfully.');
    } catch (error) {
      // handled error
    }
  }, [fixture, fixtureConfig, saveDraftFixtureRequest, tournamentData.id]);

  const handleSavePublishFixture = useCallback(() => {
    confirm({
      title: 'Are you sure you want to publish this fixture?',
      description: 'This action cannot be undone.',
    }).then(async () => {
      try {
        if (!fixture || !fixtureConfig || !isGeneratedNewFixtureType(fixture)) return;
        const { participantType, ...restFixture } = fixture;
        const submitData = {
          ...restFixture,
          ...fixtureConfig,
          status: FixtureStatus.PUBLISHED,
        };

        const res = await savePublishFixtureRequest({
          tournamentId: tournamentData.id,
          body: { ...submitData, id: String(submitData.id) },
        }).unwrap();
        setFixture(res);

        dispatch(shouldRefreshTournamentData(true));
        showSuccess('Saved and published fixture successfully');
      } catch (error) {
        // handled error
      }
    });
  }, [confirm, dispatch, fixture, fixtureConfig, savePublishFixtureRequest, tournamentData.id]);

  const handleClearDraft = useCallback(async () => {
    try {
      await clearDraftFixtureRequest(tournamentData.id).unwrap();
      showSuccess('Clear draft fixture successfully.');
      setFixture({ status: FixtureStatus.NEW });
    } catch (error) {
      // handled error
    }
  }, [clearDraftFixtureRequest, tournamentData.id]);

  const disabledButtons = savingPublishFixture || savingDraftFixture || clearingDraft;

  useEffect(() => {
    (async () => {
      if (!isNewTournament) {
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
              groups: res.groups ? getSubmittedGroupData(res.groups as any) : undefined,
            } as CreateFixtureRequest);
          }
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getFixtureRequest, tournamentData, navigate, isNewTournament]);

  if (fetchingFixture)
    return (
      <WrapperContainer>
        <CenterLoading height="100%" />
      </WrapperContainer>
    );

  if (isNewTournament) {
    return (
      <WrapperContainer>
        <Alert severity="info">
          You need to publish the tournament first in the{' '}
          <Link to={`/tournaments/${tournamentData.id}/info`}>Information</Link> tab.
        </Alert>
      </WrapperContainer>
    );
  }

  if (tournamentData.phase === TournamentPhase.PUBLISHED) {
    return (
      <WrapperContainer>
        <Alert severity="info">
          You need to finalize applicant list in the{' '}
          <Link to={`/tournaments/${tournamentData.id}/participants`}>Participants</Link> tab.
        </Alert>
      </WrapperContainer>
    );
  }

  const shouldRenderSetupForm =
    tournamentData.phase === TournamentPhase.FINALIZED_APPLICANTS && fixture?.status === FixtureStatus.NEW;

  return (
    <WrapperContainer>
      {shouldRenderSetupForm && (
        <SetupFixture
          fixtureConfig={fixtureConfig}
          setFixtureData={setFixture}
          setFixtureConfig={setFixtureConfig}
        />
      )}

      {fixture && isGeneratedNewFixtureType(fixture) && (
        <Box>
          <Box marginY={2}>
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
                isSchedule
              />
            )}
            {isGeneratedNewGroupPlayoffFixture(fixture) && (
              <GroupPlayoffFixture
                fixture={fixture}
                setFixtureData={setFixture}
              />
            )}
          </Box>
          {tournamentData.phase === TournamentPhase.FINALIZED_APPLICANTS && (
            <Box
              display="flex"
              justifyContent="flex-end"
              gap={2}
              mb={2}
            >
              {fixture.status === FixtureStatus.DRAFT && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearDraft}
                  disabled={disabledButtons}
                  startIcon={<DeleteIcon />}
                >
                  Reset
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={handleSaveDraftFixture}
                disabled={disabledButtons}
                startIcon={<DraftsIcon />}
              >
                Save as draft
              </Button>
              <Button
                variant="contained"
                onClick={handleSavePublishFixture}
                disabled={disabledButtons}
                startIcon={<RocketLaunchIcon />}
              >
                Save & Publish
              </Button>
            </Box>
          )}
        </Box>
      )}
    </WrapperContainer>
  );
}
