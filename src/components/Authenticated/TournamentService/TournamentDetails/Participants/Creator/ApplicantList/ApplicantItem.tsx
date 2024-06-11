import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Chip } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import { FormatDateTime } from 'constants/datetime';
import { ModalKey } from 'constants/modal';
import { GenderOptions } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import {
  useApproveTournamentApplicantMutation,
  useRejectTournamentApplicantMutation,
} from 'store/api/tournament/creator/participant';
import { showModal } from 'store/slice/modalSlice';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';
import { UserProfile } from 'types/user';
import { displayDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

export const ApplicantTitle = ({ user }: { user: UserProfile }) => {
  return (
    <>
      <Avatar
        src={user.image}
        alt={user.name}
        sx={{ width: '50px', height: '50px' }}
      />

      <Typography variant="h2">{user.name}</Typography>

      <Chip
        label={`${user.elo || 'No'} ELO`}
        size="small"
        variant={user.elo ? 'filled' : 'outlined'}
        color="primary"
      />
    </>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <Typography variant="body1">
      <b>{label}:</b> {value}
    </Typography>
  );
};

export default function ApplicantItem({
  data,
  refetchApplicantData,
}: {
  data: OpenTournamentApplicant;
  refetchApplicantData: () => Promise<void>;
}) {
  const dispatch = useAppDispatch();
  const tournamentData = useAppSelector(selectTournamentData);
  const [expand, setExpand] = useState(false);

  const [approveRequest, { isLoading: isApproving }] = useApproveTournamentApplicantMutation();
  const [rejectRequest, { isLoading: isRejecting }] = useRejectTournamentApplicantMutation();

  const handleApprove = async () => {
    try {
      await approveRequest({ tournamentId: tournamentData.id, userId: data.user1.id }).unwrap();
      setExpand(false);
      showSuccess(`Approved ${data.user1.name}'s registration form successfully.`);
      await refetchApplicantData();
    } catch (error) {
      // handled error
    }
  };

  const handleReject = async () => {
    try {
      await rejectRequest({ tournamentId: tournamentData.id, userId: data.user1.id }).unwrap();
      setExpand(false);
      showSuccess(`Rejected ${data.user1.name}'s registration form successfully.`);
      await refetchApplicantData();
    } catch (error) {
      // handle error
    }
  };

  const handleSeedingParticipant = useCallback(() => {
    dispatch(
      showModal(ModalKey.SELECT_SEED, {
        tournamentId: tournamentData.id,
        applicantData: data,
        onSubmit: refetchApplicantData,
      })
    );
  }, [data, dispatch, tournamentData.id, refetchApplicantData]);

  const disabledBtn = isApproving || isRejecting;

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
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
              <ApplicantTitle user={data.user1} />

              {data.user2 && <ApplicantTitle user={data.user2} />}
            </Box>
            {data.status === RegistrationStatus.APPROVED && (
              <Box
                display="flex"
                alignItems="center"
                gap={2}
              >
                {data.seed ? (
                  <Chip
                    sx={{ width: 'fit-content' }}
                    component="span"
                    variant="filled"
                    color="primary"
                    size="small"
                    label={data.seed}
                  />
                ) : null}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeedingParticipant();
                  }}
                >
                  Seed
                </Button>
              </Box>
            )}

            {/* <Chip
              sx={{ width: 'fit-content' }}
              component="span"
              variant="filled"
              color={RegistrationStatusChip[data.status].chipColor}
              size="small"
              label={RegistrationStatusChip[data.status].displayText}
            )}

            {/* <Chip
              sx={{ width: 'fit-content' }}
              component="span"
              variant="filled"
              color={RegistrationStatusChip[data.status].chipColor}
              size="small"
              label={RegistrationStatusChip[data.status].displayText}
            /> */}
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
              <InfoItem
                label={data.user2 ? 'Applicant 1' : 'Email'}
                value={data.user1.email}
              />
              <InfoItem
                label="Gender"
                value={GenderOptions[data.user1.gender]}
              />
            </Box>

            {data?.user2 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                }}
              >
                <InfoItem
                  label="Applicant 2"
                  value={data.user2.email}
                />

                <InfoItem
                  label="Gender"
                  value={GenderOptions[data.user2.gender]}
                />
              </Box>
            )}

            <InfoItem
              label="Message"
              value={data.message}
            />

            <InfoItem
              label="Applied Date"
              value={displayDateTime({
                dateTime: data.appliedDate,
                targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
              })}
            />
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', columnGap: '10px' }}>
            {/* TODO: need to implement view profile */}
            {/* <Tooltip title="View Profile">
              <Fab
                size="small"
                color="info"
                onClick={() => navigate(`/profile/${data.user1.id}`)}
              >
                <AccountBoxIcon />
              </Fab>
            </Tooltip> */}

            {data.status === RegistrationStatus.PENDING && (
              <>
                <Tooltip title="Approve">
                  <Fab
                    size="small"
                    color="success"
                    onClick={handleApprove}
                    disabled={disabledBtn}
                  >
                    <CheckIcon />
                  </Fab>
                </Tooltip>

                <Tooltip title="Reject">
                  <Fab
                    size="small"
                    color="error"
                    onClick={handleReject}
                    disabled={disabledBtn}
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
