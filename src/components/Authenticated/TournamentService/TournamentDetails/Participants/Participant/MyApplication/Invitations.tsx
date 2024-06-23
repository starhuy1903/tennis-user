import { Box, Typography } from '@mui/material';

import { OpenTournamentApplicant } from 'types/open-tournament-participants';

import InvitationItem from './InvitationItem';

export default function Invitations({
  title,
  invitations,
  fetchMyApplication,
}: {
  title: string;
  invitations: OpenTournamentApplicant[];
  fetchMyApplication: () => void;
}) {
  if (!invitations || invitations.length === 0) {
    return null;
  }

  return (
    <Box my={5}>
      <Typography
        variant="h4"
        mb={2}
      >
        {title}
      </Typography>

      {invitations.map((item, index) => (
        <InvitationItem
          key={index}
          data={item}
          fetchMyApplication={fetchMyApplication}
        />
      ))}
    </Box>
  );
}
