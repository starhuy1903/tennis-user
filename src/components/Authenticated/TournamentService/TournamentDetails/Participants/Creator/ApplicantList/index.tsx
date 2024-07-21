import CheckIcon from '@mui/icons-material/Check';
import { Box, Button, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import OverlayCenterLoading from 'components/Common/OverlayCenterLoading';
import { ParticipantType } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import {
  useFinalizeApplicantMutation,
  useLazyGetOpenTournamentApplicantsQuery,
} from 'store/api/tournament/creator/participant';
import { selectTournamentData, shouldRefreshTournamentData } from 'store/slice/tournamentSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';
import { showSuccess } from 'utils/toast';

import ApplicantItem from './ApplicantItem';

const MIN_PARTICIPANT = 6;

export default function ApplicantList() {
  const confirm = useConfirm();
  const tournamentData = useAppSelector(selectTournamentData);
  const dispatch = useAppDispatch();

  const [fetchingApplicant, setFetchingApplicant] = useState(false);
  const [getApplicantsRequest] = useLazyGetOpenTournamentApplicantsQuery();
  const [finalizeApplicantRequest, { isLoading: finalizing }] = useFinalizeApplicantMutation();

  const [applicants, setApplicants] = useState<{
    unapproved: OpenTournamentApplicant[];
    approved: OpenTournamentApplicant[];
    rejected: OpenTournamentApplicant[];
  }>({
    unapproved: [],
    approved: [],
    rejected: [],
  });

  const handleGetApplicantData = useCallback(async () => {
    try {
      setFetchingApplicant(true);
      const responses = await Promise.all([
        getApplicantsRequest({ tournamentId: tournamentData.id, status: RegistrationStatus.PENDING }).unwrap(),
        getApplicantsRequest({ tournamentId: tournamentData.id, status: RegistrationStatus.APPROVED }).unwrap(),
        getApplicantsRequest({ tournamentId: tournamentData.id, status: RegistrationStatus.REJECTED }).unwrap(),
      ]);
      setApplicants({
        unapproved: responses[0].data,
        approved: responses[1].data,
        rejected: responses[2].data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingApplicant(false);
    }
  }, [getApplicantsRequest, tournamentData.id]);

  const handleFinalizeApplicant = useCallback(() => {
    confirm({
      title: 'Confirmation',
      description: 'After finalizing, you cannot change the Tournament Timeline. Are you sure you want to finalize?',
    }).then(async () => {
      try {
        await finalizeApplicantRequest(tournamentData.id).unwrap();
        dispatch(shouldRefreshTournamentData(true));
        showSuccess('Finalized participant successfully');
      } catch (e) {
        // handled error
      }
    });
  }, [confirm, dispatch, finalizeApplicantRequest, tournamentData.id]);

  useEffect(() => {
    handleGetApplicantData();
  }, [handleGetApplicantData]);

  const disabledFinalizeBtn = finalizing || applicants.approved.length === 0;

  if (
    fetchingApplicant &&
    !applicants.unapproved.length &&
    !applicants.approved.length &&
    !applicants.rejected.length
  ) {
    return <CenterLoading height="50vh" />;
  }

  return (
    <Box my={5}>
      <Stack
        direction="row"
        alignItems="center"
        mb={2}
        gap={1}
      >
        <Typography variant="h4">Applicants</Typography>

        <Chip
          label={
            tournamentData.participantType === ParticipantType.DOUBLES
              ? applicants.unapproved.length * 2
              : applicants.unapproved.length
          }
          color="info"
          size="small"
        />
      </Stack>

      <Box position="relative">
        {applicants && applicants.unapproved.length > 0 ? (
          applicants.unapproved.map((e) => (
            <ApplicantItem
              data={e}
              refetchApplicantData={handleGetApplicantData}
            />
          ))
        ) : (
          <NoData message="No applicants yet." />
        )}

        {fetchingApplicant && applicants && applicants.unapproved.length && <OverlayCenterLoading />}
      </Box>

      <Box mt={6}>
        <Box
          display="flex"
          justifyContent="space-between"
          mb={2}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            <Typography variant="h4">Approved Applicants</Typography>
            <Chip
              label={`${
                tournamentData.participantType === ParticipantType.DOUBLES
                  ? applicants.approved.length * 2
                  : applicants.approved.length
              }/${tournamentData.maxParticipants}`}
              color="success"
              size="small"
            />
          </Stack>

          <Tooltip
            title={
              applicants.approved.length < MIN_PARTICIPANT
                ? `The tournament needs at least ${MIN_PARTICIPANT} ${
                    tournamentData.participantType === ParticipantType.SINGLE ? 'applicants' : 'teams'
                  } to finalize`
                : null
            }
          >
            <span>
              <Button
                variant="contained"
                onClick={handleFinalizeApplicant}
                disabled={disabledFinalizeBtn || applicants.approved.length < MIN_PARTICIPANT}
                startIcon={<CheckIcon />}
              >
                Finalize Applicant
              </Button>
            </span>
          </Tooltip>
        </Box>

        <Box position="relative">
          {applicants && applicants.approved.length > 0 ? (
            applicants.approved.map((e) => (
              <ApplicantItem
                data={e}
                refetchApplicantData={handleGetApplicantData}
              />
            ))
          ) : (
            <NoData message="No approved applicants yet." />
          )}

          {fetchingApplicant && applicants && applicants.approved.length > 0 && <OverlayCenterLoading />}
        </Box>
      </Box>

      <Box mt={6}>
        <Stack
          direction="row"
          alignItems="center"
          mb={2}
          gap={1}
        >
          <Typography variant="h4">Rejected Applicants</Typography>

          <Chip
            label={
              tournamentData.participantType === ParticipantType.DOUBLES
                ? applicants.rejected.length * 2
                : applicants.rejected.length
            }
            color="error"
            size="small"
          />
        </Stack>

        <Box position="relative">
          {applicants && applicants.rejected.length > 0 ? (
            applicants.rejected.map((e) => (
              <ApplicantItem
                data={e}
                refetchApplicantData={handleGetApplicantData}
              />
            ))
          ) : (
            <NoData message="No rejected applicants yet." />
          )}

          {fetchingApplicant && applicants && applicants.rejected.length > 0 && <OverlayCenterLoading />}
        </Box>
      </Box>
    </Box>
  );
}
