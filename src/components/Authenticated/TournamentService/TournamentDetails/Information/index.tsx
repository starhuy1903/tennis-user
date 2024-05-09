import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import Steps from 'components/Common/Steps';
import {
  GenderOptions,
  ParticipantTypeOptions,
  TournamentFormatOptions,
  TournamentPhase,
  TournamentPhaseOptions,
} from 'constants/tournament';
import { useMoveToNextPhaseMutation } from 'store/api/tournament/tournamentApiSlice';
import { setTournamentDetails } from 'store/slice/tournamentSlice';
import { displayDate } from 'utils/datetime';
import { showError, showSuccess } from 'utils/toast';

import InfoSection from './InfoSection';

export default function Information() {
  const dispatch = useAppDispatch();
  const [moveToNextPhase, { isLoading: isNextPhaseLoading }] = useMoveToNextPhaseMutation();
  const tournamentData = useAppSelector((state) => state.tournament.data);

  const handlePublishTournament = async () => {
    try {
      if (!tournamentData) throw new Error('Tournament data not found');

      const res = await moveToNextPhase(tournamentData.id).unwrap();
      dispatch(setTournamentDetails(res));
      showSuccess('Published tournament successfully.');
    } catch (error) {
      showError('Published tournament failed.');
    }
  };

  if (!tournamentData) {
    return <CenterLoading />;
  }

  const tournamentTimelineFields = [
    { label: 'DUE BY', value: displayDate(tournamentData.registrationDueDate) },
    { label: 'START', value: displayDate(tournamentData.startDate) },
    { label: 'ENDS', value: displayDate(tournamentData.endDate) },
  ];

  // Format, participants, gender, participant type, players born after, scope
  const tournamentDetailsFields = [
    { label: 'PARTICIPANTS', value: `${tournamentData.participants}/${tournamentData.maxParticipants}` },
    { label: 'TYPE', value: ParticipantTypeOptions[tournamentData.participantType] },
    { label: 'GENDER', value: GenderOptions[tournamentData.gender] },
    { label: 'FORMAT', value: TournamentFormatOptions[tournamentData.format] },
    { label: 'BORN AFTER', value: displayDate(tournamentData.playersBornAfterDate) },
  ];

  const contactInformationFields = [
    { label: 'NAME', value: tournamentData.contactPersonName },
    { label: 'NUMBER', value: tournamentData.contactNumber, variant: 'phone' as const },
    { label: 'EMAIL', value: tournamentData.contactEmail, variant: 'email' as const },
    { label: 'ADDRESS', value: tournamentData.address },
  ];

  const steps = Object.values(TournamentPhaseOptions);

  return (
    <Grid
      container
      spacing={4}
      mt={1}
      mb={2}
    >
      <Grid
        item
        xs={9}
      >
        <Typography variant="h4">Information</Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />

        <Typography
          variant="body1"
          textAlign="justify"
        >
          {tournamentData.description}
        </Typography>

        <Divider
          sx={{
            my: 2,
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4">Phases</Typography>
        </Box>

        <Steps
          currentStep={TournamentPhaseOptions[tournamentData.phase]}
          steps={steps}
        />
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {tournamentData.isCreator && tournamentData.phase === TournamentPhase.NEW && (
          <Button
            variant="contained"
            size="medium"
            onClick={handlePublishTournament}
            disabled={isNextPhaseLoading}
          >
            Publish tournament
          </Button>
        )}
        <InfoSection
          title="Tournament Time Line"
          fields={tournamentTimelineFields}
        />

        <InfoSection
          title="Tournament Details"
          fields={tournamentDetailsFields}
        />

        <InfoSection
          title="Contact Information"
          fields={contactInformationFields}
        />
      </Grid>
    </Grid>
  );
}
