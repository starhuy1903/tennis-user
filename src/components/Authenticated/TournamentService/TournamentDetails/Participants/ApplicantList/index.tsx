import { Box, Button, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { RegistrationStatus } from 'constants/tournament-participants';
import {
  useFinalizeApplicantMutation,
  useLazyGetOpenTournamentApplicantsQuery,
} from 'store/api/tournament/creator/participant';
import { selectTournamentData, shouldRefreshTournamentData } from 'store/slice/tournamentSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';

import ApplicantItem from './ApplicantItem';

export default function ApplicantList() {
  const confirm = useConfirm();
  const tournamentData = useAppSelector(selectTournamentData);
  const dispatch = useAppDispatch();

  const [fetchingApplicant, setFetchingApplicant] = useState(false);
  const [getApplicantsRequest] = useLazyGetOpenTournamentApplicantsQuery();
  const [finalizeApplicantRequest, { isLoading: finalizing }] = useFinalizeApplicantMutation();

  const [applicants, setApplicants] = useState<{
    all: OpenTournamentApplicant[];
    approved: OpenTournamentApplicant[];
    rejected: OpenTournamentApplicant[];
  }>({
    all: [],
    approved: [],
    rejected: [],
  });

  const unapprovedApplicants = useMemo(
    () => applicants.all.filter((a) => a.status === RegistrationStatus.PENDING) || [],
    [applicants]
  );

  const handleGetApplicantData = useCallback(async () => {
    try {
      setFetchingApplicant(true);
      const responses = await Promise.all([
        getApplicantsRequest({ tournamentId: tournamentData.id }).unwrap(),
        getApplicantsRequest({ tournamentId: tournamentData.id, status: RegistrationStatus.APPROVED }).unwrap(),
        getApplicantsRequest({ tournamentId: tournamentData.id, status: RegistrationStatus.REJECTED }).unwrap(),
      ]);
      setApplicants({
        all: responses[0].data,
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
      } catch (e) {
        // handled error
      }
    });
  }, [confirm, dispatch, finalizeApplicantRequest, tournamentData.id]);

  useEffect(() => {
    handleGetApplicantData();
  }, [handleGetApplicantData]);

  const disabledFinalizeBtn = finalizing || applicants.approved.length === 0;

  if (fetchingApplicant) {
    return <CenterLoading height="10vh" />;
  }

  return (
    <Box my={5}>
      <Typography
        variant="h4"
        mb={2}
      >
        Applicants
      </Typography>

      {unapprovedApplicants.length > 0 ? (
        unapprovedApplicants.map((e) => (
          <ApplicantItem
            data={e}
            refetchApplicantData={handleGetApplicantData}
          />
        ))
      ) : (
        <NoData message="No applicants yet." />
      )}

      <Box mt={6}>
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h4">Approved Applicants</Typography>

          <Button
            variant="contained"
            onClick={handleFinalizeApplicant}
            disabled={disabledFinalizeBtn}
          >
            Finalize Applicant
          </Button>
        </Box>

        <Box mt={2}>
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
        </Box>
      </Box>

      <Typography
        variant="h4"
        mt={6}
        mb={2}
      >
        Rejected Applicants
      </Typography>

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
    </Box>
  );
}
