import { Box, Typography } from '@mui/material';

import { OpenTournamentApplicant } from 'types/open-tournament-participants';

import InvitationItem from './InvitationItem';

export default function Invitations({ title, invitations }: { title: string; invitations: OpenTournamentApplicant[] }) {
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
          data={item}
          key={index}
        />
      ))}
    </Box>
  );
}
