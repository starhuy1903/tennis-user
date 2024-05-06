import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { GenderOptions } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import { useDeleteApplicationMutation } from 'store/api/tournament/tournamentParticipantsApiSlice';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';
import { UserProfile } from 'types/user';
import { formatDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

const ApplicantInfo = ({ title, user }: { title: string; user: UserProfile }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mt: 2,
        }}
      >
        <Avatar
          src={user.image}
          alt={user.name}
          sx={{ width: '180px', height: '180px' }}
        />

        <Chip
          label={`${user.elo} ELO`}
          size="small"
          variant="filled"
          color="primary"
        />
      </Box>

      <Box sx={{ width: '100%' }}>
        <Typography variant="h6">{title}</Typography>
        <Stack
          sx={{ mt: 1 }}
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={2}
          >
            <FormControl fullWidth>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                value={user.name}
                disabled
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel htmlFor="name">Email</FormLabel>
              <TextField
                value={user.email}
                disabled
              />
            </FormControl>
          </Stack>

          <Stack
            direction="row"
            spacing={2}
          >
            <FormControl fullWidth>
              <FormLabel htmlFor="name">Gender</FormLabel>
              <TextField
                value={GenderOptions[user.gender]}
                disabled
              />
            </FormControl>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default function ApplicationForm({ data }: { data: OpenTournamentApplicant }) {
  const navigate = useNavigate();

  const { tournamentId } = useParams();

  const [cancelApplication, { isLoading }] = useDeleteApplicationMutation();

  const handleCancelApplication = async () => {
    try {
      await cancelApplication({ tournamentId: parseInt(tournamentId!) }).unwrap();
      showSuccess('Application has been canceled.');
      navigate(`/tournaments/${tournamentId}/participants`);
    } catch (error) {
      // handle error
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ marginY: 8, borderRadius: 1, boxShadow: 1, padding: 4, backgroundColor: 'background.paper' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          My Application
        </Typography>

        {/* <Chip
          sx={{ width: 'fit-content' }}
          component="span"
          variant="filled"
          color={RegistrationStatusChip[data.status].chipColor}
          size="medium"
          label={RegistrationStatusChip[data.status].displayText}
        /> */}
      </Box>

      <Box
        component="form"
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 4 }}
      >
        <ApplicantInfo
          title={data?.user2 ? 'Applicant 1' : 'Information'}
          user={data.user1}
        />

        {data?.user2 && (
          <ApplicantInfo
            title="Applicant 2"
            user={data.user2}
          />
        )}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={'center'}
        >
          <Box sx={{ width: '50%' }}></Box>

          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Other Information</Typography>
            <Stack
              sx={{ mt: 1 }}
              spacing={2}
            >
              <FormControl fullWidth>
                <FormLabel htmlFor="name">Applied Date</FormLabel>
                <TextField
                  value={formatDateTime(data.appliedDate)}
                  disabled
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="name">Message</FormLabel>
                <TextField
                  value={data.message}
                  multiline
                  rows={4}
                  disabled
                />
              </FormControl>
            </Stack>
          </Box>
        </Stack>

        {(data.status === RegistrationStatus.PENDING || data.status === RegistrationStatus.INVITING) && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Box sx={{ width: '50%' }}></Box>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Button
                size="medium"
                variant="contained"
                color="error"
                onClick={handleCancelApplication}
                disabled={isLoading}
              >
                Cancel Application
              </Button>
            </Box>
          </Stack>
        )}
      </Box>
    </Container>
  );
}
