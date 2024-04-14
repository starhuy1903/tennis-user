import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { GenderOptions } from 'constants/tournament';
import { RegistrationStatusChip } from 'constants/tournament-participants';
import {
  useApproveInvitationMutation,
  useRejectInvitationMutation,
} from 'store/api/tournament/tournamentParticipantsApiSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';
import { showSuccess } from 'utils/toast';

export default function InvitationItem({ data }: { data: OpenTournamentApplicant }) {
  const navigate = useNavigate();

  const [expand, setExpand] = useState<boolean>(false);

  const { tournamentId } = useParams();

  const [approveInvitation, { isLoading: isApproving }] = useApproveInvitationMutation();
  const [rejectInvitation, { isLoading: isRejecting }] = useRejectInvitationMutation();

  const handleApprove = async () => {
    try {
      await approveInvitation({ tournamentId: parseInt(tournamentId!), inviterId: data.user1.id }).unwrap();
      showSuccess(`Approved ${data.user1.name}'s invitation.`);
      navigate(`/tournaments/${tournamentId}/participants`);
    } catch (error) {
      // handle error
    }
  };

  const handleReject = async () => {
    try {
      await rejectInvitation({ tournamentId: parseInt(tournamentId!), inviterId: data.user1.id }).unwrap();
      showSuccess(`Rejected ${data.user1.name}'s invitation.`);
      navigate(`/tournaments/${tournamentId}/participants`);
    } catch (error) {
      // handle error
    }
  };

  return (
    <Accordion
      expanded={expand}
      onChange={() => setExpand(!expand)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
          <Avatar
            src={data.user1.image}
            alt={data.user1.name}
            sx={{ width: '50px', height: '50px' }}
          />

          <Typography variant="h2">{data.user1.name}</Typography>

          <Chip
            sx={{ width: 'fit-content' }}
            component="span"
            variant="filled"
            color={RegistrationStatusChip[data.status].chipColor}
            size="small"
            label={RegistrationStatusChip[data.status].displayText}
          />
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="column">
            <Typography variant="body1">
              <strong>Email:</strong> {data.user1.email}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {GenderOptions[data.user1.gender]}
            </Typography>
            <Typography variant="body1">
              <strong>Message:</strong> {data.message}
            </Typography>
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', columnGap: '10px' }}>
            <Tooltip title="View Profile">
              <Fab
                size="small"
                color="info"
                onClick={() => navigate(`/profile/${data.user1.id}`)}
              >
                <AccountBoxIcon />
              </Fab>
            </Tooltip>

            <Tooltip title="Approve">
              <Fab
                size="small"
                color="success"
                onClick={handleApprove}
                disabled={isApproving || isRejecting}
              >
                <CheckIcon />
              </Fab>
            </Tooltip>

            <Tooltip title="Reject">
              <Fab
                size="small"
                color="error"
                onClick={handleReject}
                disabled={isApproving || isRejecting}
              >
                <CloseIcon />
              </Fab>
            </Tooltip>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
