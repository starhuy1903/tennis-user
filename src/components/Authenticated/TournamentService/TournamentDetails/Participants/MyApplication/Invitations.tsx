import { Box, Typography } from '@mui/material';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { RegistrationStatus } from 'constants/tournament-participants';
import { useGetInvitationsQuery } from 'store/api/tournament/participant/participant';
import { selectTournamentData } from 'store/slice/tournamentSlice';

import InvitationItem from './InvitationItem';

export default function Invitations({ status }: { status: RegistrationStatus.INVITING | RegistrationStatus.CANCELED }) {
  const tournamentData = useAppSelector(selectTournamentData);

  const { data, isLoading } = useGetInvitationsQuery({
    tournamentId: tournamentData.id,
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
