import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { RegistrationStatus } from 'constants/tournament-participants';
import { useGetInvitationsQuery } from 'store/api/tournament/tournamentParticipantsApiSlice';

import InvitationItem from './InvitationItem';

export default function Invitations({ status }: { status: RegistrationStatus.INVITING | RegistrationStatus.CANCELED }) {
  const { tournamentId } = useParams();
  const { data, isLoading } = useGetInvitationsQuery({
    tournamentId: parseInt(tournamentId!),
    status,
  });

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
            {status === RegistrationStatus.INVITING ? 'Invitations' : 'Canceled Invitations'}
          </Typography>

          {data.data.map((e, index) => (
            <InvitationItem
              data={e}
              key={index}
            />
          ))}
        </>
      )}
    </Box>
  );
}
