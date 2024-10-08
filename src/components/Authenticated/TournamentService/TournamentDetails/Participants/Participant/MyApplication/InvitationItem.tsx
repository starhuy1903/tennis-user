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
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import { GenderOptions } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import {
  useApproveInvitationMutation,
  useRejectInvitationMutation,
} from 'store/api/tournament/participant/participant';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';
import { showSuccess } from 'utils/toast';

export default function InvitationItem({
  data,
  fetchMyApplication,
}: {
  data: OpenTournamentApplicant;
  fetchMyApplication: () => void;
}) {
  const navigate = useNavigate();
  const tournamentData = useAppSelector(selectTournamentData);

  const [expand, setExpand] = useState(false);

  const [approveInvitation, { isLoading: isApproving }] = useApproveInvitationMutation();
  const [rejectInvitation, { isLoading: isRejecting }] = useRejectInvitationMutation();

  const handleApprove = async () => {
    try {
      await approveInvitation({ tournamentId: tournamentData.id, inviterId: data.user1.id }).unwrap();
      showSuccess(`Approved ${data.user1.name}'s invitation successfully.`);
      await fetchMyApplication();
    } catch (error) {
      // handle error
    }
  };

  const handleReject = async () => {
    try {
      await rejectInvitation({ tournamentId: tournamentData.id, inviterId: data.user1.id }).unwrap();
      showSuccess(`Rejected ${data.user1.name}'s invitation successfully.`);
      await fetchMyApplication();
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
            label={`${data.user1.elo || 'No'} ELO`}
            size="small"
            variant={data.user1.elo ? 'filled' : 'outlined'}
            color="primary"
          />

          {/* <Chip
            sx={{ width: 'fit-content' }}
            component="span"
            variant="filled"
            color={RegistrationStatusChip[data.status].chipColor}
            size="small"
            label={RegistrationStatusChip[data.status].displayText}
          /> */}
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="column">
            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <Typography variant="body1">
                <b>Email:</b> {data.user1.email}
              </Typography>
              <Typography variant="body1">
                <b>Gender:</b> {GenderOptions[data.user1.gender]}
              </Typography>
            </Box>
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

            {data.status !== RegistrationStatus.CANCELED && (
              <>
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
              </>
            )}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
