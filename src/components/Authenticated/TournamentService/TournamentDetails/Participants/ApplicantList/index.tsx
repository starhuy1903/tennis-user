import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { RegistrationStatus } from 'constants/tournament-participants';
import { useLazyGetOpenTournamentApplicantsQuery } from 'store/api/tournament/tournamentParticipantsApiSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';

import ApplicantItem from './ApplicantItem';

export default function ApplicantList() {
  const { tournamentId } = useParams();

  const [getApplicants, { isLoading }] = useLazyGetOpenTournamentApplicantsQuery();

  const [applicants, setApplicants] = useState<{
    unapproved: OpenTournamentApplicant[];
    approved: OpenTournamentApplicant[];
    rejected: OpenTournamentApplicant[];
  }>({
    unapproved: [],
    approved: [],
    rejected: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          getApplicants({ tournamentId: parseInt(tournamentId!) }).unwrap(),
          getApplicants({ tournamentId: parseInt(tournamentId!), status: RegistrationStatus.APPROVED }).unwrap(),
          getApplicants({ tournamentId: parseInt(tournamentId!), status: RegistrationStatus.REJECTED }).unwrap(),
        ]);
        setApplicants({
          unapproved: responses[0].data,
          approved: responses[1].data,
          rejected: responses[2].data,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getApplicants, tournamentId]);

  if (isLoading) {
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
        <Typography textAlign="center">No applicants yet.</Typography>
      )}

      <Typography
        variant="h4"
        mt={6}
        mb={2}
      >
        Approved Applicants
      </Typography>

      {applicants && applicants.approved.length > 0 ? (
        applicants.approved.map((e) => <ApplicantItem data={e} />)
      ) : (
        <Typography textAlign="center">No approved applicants yet.</Typography>
      )}

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
        <Typography textAlign="center">No rejected applicants yet.</Typography>
      )}
    </Box>
  );
}
