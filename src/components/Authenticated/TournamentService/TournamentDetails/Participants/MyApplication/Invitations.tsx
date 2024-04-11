import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { useGetInvitationsQuery } from 'store/api/tournament/tournamentParticipantsApiSlice';

import InvitationItem from './InvitationItem';

export default function Invitations() {
  const { tournamentId } = useParams();
  const { data, isLoading } = useGetInvitationsQuery({
    tournamentId: parseInt(tournamentId!),
  });

  console.log(data);

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box my={5}>
      {data && data.data.length > 0 && (
        <>
          <Typography
            variant="h4"
            mb={2}
          >
            Invitations
          </Typography>

          {data.data.map((e) => (
            <InvitationItem data={e} />
          ))}
        </>
      )}
    </Box>
  );
}
