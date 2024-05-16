import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { RegistrationStatus } from 'constants/tournament-participants';
import { useFinalizeApplicantMutation } from 'store/api/tournament/creator/participant';
import { useLazyGetOpenTournamentApplicantsQuery } from 'store/api/tournament/shared/participant';
import { selectTournamentData, shouldRefreshTournamentData } from 'store/slice/tournamentSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';

import ApplicantItem from './ApplicantItem';

export default function ApplicantList() {
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

  const handleFinalizeApplicant = useCallback(async () => {
    try {
      await finalizeApplicantRequest(tournamentData.id);
      dispatch(shouldRefreshTournamentData(true));
    } catch (e) {
      // handled error
    }
  }, [dispatch, finalizeApplicantRequest, tournamentData.id]);

  useEffect(() => {
    (async () => {
      try {
        setFetchingApplicant(true);
        const responses = await Promise.all([
          getApplicantsRequest({ tournamentId: tournamentData.id }).unwrap(),
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
    })();
  }, [getApplicantsRequest, tournamentData]);

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

      {applicants && applicants.unapproved.length > 0 ? (
        applicants.unapproved.map((e) => <ApplicantItem data={e} />)
      ) : (
        <NoData message="No applicants yet." />
      )}

      <Box
        mt={6}
        mb={2}
      >
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

        {applicants && applicants.approved.length > 0 ? (
          applicants.approved.map((e) => <ApplicantItem data={e} />)
        ) : (
          <NoData message="No approved applicants yet." />
        )}
      </Box>

      <Typography
        variant="h4"
        mt={6}
        mb={2}
      >
        Rejected Applicants
      </Typography>

      {applicants && applicants.rejected.length > 0 ? (
        applicants.rejected.map((e) => <ApplicantItem data={e} />)
      ) : (
        <NoData message="No rejected applicants yet." />
      )}
    </Box>
  );
}
