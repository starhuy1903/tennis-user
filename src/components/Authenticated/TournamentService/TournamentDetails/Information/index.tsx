import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import Steps from 'components/Common/Steps';
import {
  GenderOptions,
  ParticipantTypeOptions,
  TournamentFormatOptions,
  TournamentPhase,
  TournamentPhaseOptions,
} from 'constants/tournament';
import {
  useLazyGetOpenTournamentDetailsQuery,
  useMoveToNextPhaseMutation,
} from 'store/api/tournament/tournamentApiSlice';
import { OpenTournament } from 'types/tournament';
import { displayDate } from 'utils/datetime';
import { showError } from 'utils/toast';

import InfoSection from './InfoSection';

export default function Information() {
  const navigate = useNavigate();
  const [getTournamentDetails, { isLoading }] = useLazyGetOpenTournamentDetailsQuery();
  const [moveToNextPhase, { isLoading: isNextPhaseLoading }] = useMoveToNextPhaseMutation();

  const [tournament, setTournament] = useState<OpenTournament | null>(null);

  const { tournamentId } = useParams();

  useEffect(() => {
    (async () => {
      if (tournamentId) {
        try {
          const res = await getTournamentDetails(parseInt(tournamentId)).unwrap();
          setTournament(res);
        } catch (error) {
          showError('Tournament not found.');
          navigate('/tournaments');
        }
      } else {
        showError('Tournament not found.');
        navigate('/tournaments');
      }
    })();
  }, [getTournamentDetails, navigate, tournamentId]);

  const handleNextPhaseClick = async () => {
    try {
      const res = await moveToNextPhase(parseInt(tournamentId!)).unwrap();

      setTournament(res);
    } catch (error) {
      showError('Failed to move to next phase.');
    }
  };

  if (isLoading || !tournament) {
    return <CenterLoading />;
  }

  const tournamentTimelineFields = [
    { label: 'DUE BY', value: displayDate(tournament.registrationDueDate) },
    { label: 'START', value: displayDate(tournament.startDate) },
    { label: 'ENDS', value: displayDate(tournament.endDate) },
  ];

  // Format, participants, gender, participant type, players born after, scope
  const tournamentDetailsFields = [
    { label: 'PARTICIPANTS', value: `${tournament.participants}/${tournament.maxParticipants}` },
    { label: 'TYPE', value: ParticipantTypeOptions[tournament.participantType] },
    { label: 'GENDER', value: GenderOptions[tournament.gender] },
    { label: 'FORMAT', value: TournamentFormatOptions[tournament.format] },
    { label: 'BORN AFTER', value: displayDate(tournament.playersBornAfterDate) },
  ];

  const contactInformationFields = [
    { label: 'NAME', value: tournament.contactPersonName },
    { label: 'NUMBER', value: tournament.contactNumber, variant: 'phone' as const },
    { label: 'EMAIL', value: tournament.contactEmail, variant: 'email' as const },
    { label: 'ADDRESS', value: tournament.address },
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
          {tournament.description}
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

          {tournament.isCreator && tournament.phase !== TournamentPhase.COMPLETED && (
            <Button
              variant="contained"
              size="medium"
              onClick={handleNextPhaseClick}
              disabled={isNextPhaseLoading}
            >
              Next Phase
            </Button>
          )}
        </Box>

        <Steps
          currentStep={TournamentPhaseOptions[tournament.phase]}
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
