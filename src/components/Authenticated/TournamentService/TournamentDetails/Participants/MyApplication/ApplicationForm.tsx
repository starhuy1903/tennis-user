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
import { formatDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={'center'}
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
              src={data?.user1.image}
              alt={data?.user1.name}
              sx={{ width: '180px', height: '180px' }}
            />

            <Chip
              label={`${data.user1.elo} ELO`}
              size="small"
              variant="filled"
              color="primary"
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">{data?.user2 ? 'Application 1' : 'Information'}</Typography>
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
                  <TextField value={data?.user1.name} />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel htmlFor="name">Email</FormLabel>
                  <TextField value={data?.user1.email} />
                </FormControl>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
              >
                <FormControl fullWidth>
                  <FormLabel htmlFor="name">Gender</FormLabel>
                  <TextField value={GenderOptions[data?.user1.gender]} />
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        {data?.user2 && (
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Box
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar
                src={data?.user2.image}
                alt={data?.user2.name}
                sx={{ width: '180px', height: '180px' }}
              />

              <Chip
                label={`${data.user1.elo} ELO`}
                size="small"
                variant="filled"
                color="primary"
              />
            </Box>

            <Box sx={{ width: '100%' }}>
              <Typography variant="h6">Applicant 2</Typography>
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
                    <TextField value={data?.user2.name} />
                  </FormControl>

                  <FormControl fullWidth>
                    <FormLabel htmlFor="name">Email</FormLabel>
                    <TextField value={data?.user2.email} />
                  </FormControl>
                </Stack>

                <Stack
                  direction="row"
                  spacing={2}
                >
                  <FormControl fullWidth>
                    <FormLabel htmlFor="name">Gender</FormLabel>
                    <TextField value={GenderOptions[data?.user2.gender]} />
                  </FormControl>
                </Stack>
              </Stack>
            </Box>
          </Stack>
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
                <TextField value={formatDateTime(data.appliedDate)} />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="name">Message</FormLabel>
                <TextField
                  value={data.message}
                  multiline
                  rows={4}
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
