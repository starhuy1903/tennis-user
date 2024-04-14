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
import { RegistrationStatus, RegistrationStatusChip } from 'constants/tournament-participants';
import {
  useApproveTournamentApplicantMutation,
  useRejectTournamentApplicantMutation,
} from 'store/api/tournament/tournamentParticipantsApiSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';
import { formatDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

export default function ApplicantItem({ data }: { data: OpenTournamentApplicant }) {
  const navigate = useNavigate();

  const [expand, setExpand] = useState(false);

  const { tournamentId } = useParams();

  const [approveRequest, { isLoading: isApproving }] = useApproveTournamentApplicantMutation();
  const [rejectRequest, { isLoading: isRejecting }] = useRejectTournamentApplicantMutation();

  const handleApprove = async () => {
    try {
      await approveRequest({ tournamentId: parseInt(tournamentId!), userId: data.user1.id }).unwrap();
      showSuccess(`Approved ${data.user1.name}'s registration form.`);
    } catch (error) {
      // handle error
    }
  };

  const handleReject = async () => {
    try {
      await rejectRequest({ tournamentId: parseInt(tournamentId!), userId: data.user1.id }).unwrap();
      showSuccess(`Rejected ${data.user1.name}'s registration form.`);
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
            <Avatar
              src={data.user1.image}
              alt={data.user1.name}
              sx={{ width: '50px', height: '50px' }}
            />

            <Typography variant="h2">{data.user1.name}</Typography>

            {data?.user2 && (
              <>
                <Avatar
                  src={data.user1.image}
                  alt={data.user1.name}
                  sx={{ width: '50px', height: '50px' }}
                />

                <Typography variant="h2">{data.user1.name}</Typography>
              </>
            )}

            <Chip
              sx={{ width: 'fit-content' }}
              component="span"
              variant="filled"
              color={RegistrationStatusChip[data.status].chipColor}
              size="small"
              label={RegistrationStatusChip[data.status].displayText}
            />
          </Box>
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
                <strong>{data?.user2 ? 'Applicant 1:' : 'Email:'}</strong> {data.user1.email}
              </Typography>
              <Typography variant="body1">
                <strong>Gender:</strong> {GenderOptions[data.user1.gender]}
              </Typography>
            </Box>

            {data?.user2 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <Typography variant="body1">
                  <strong>Applicant 2:</strong> {data.user2.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Gender:</strong> {GenderOptions[data.user2.gender]}
                </Typography>
              </Box>
            )}

            <Typography variant="body1">
              <strong>Message:</strong> {data.message}
            </Typography>
            <Typography variant="body1">
              <strong>Applied date:</strong> {formatDateTime(data.appliedDate)}
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

            {data.status === RegistrationStatus.PENDING && (
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
