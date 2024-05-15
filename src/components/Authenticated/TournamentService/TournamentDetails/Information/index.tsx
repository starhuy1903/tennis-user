import { Button, Divider, Grid, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import { FormatDateTime } from 'constants/datetime';
import { GenderOptions, ParticipantTypeOptions, TournamentFormatOptions, TournamentPhase } from 'constants/tournament';
import { usePublishTournamentMutation } from 'store/api/tournament/tournamentApiSlice';
import { checkTournamentRole, selectTournamentData, shouldRefreshTournamentData } from 'store/slice/tournamentSlice';
import { displayDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

import UpdateTournament from '../UpdateTournament';
import InfoSection from './InfoSection';

const displayDate = (date: string) => {
  return displayDateTime({
    dateTime: date,
    targetFormat: FormatDateTime.DATE_2,
  });
};

export default function Information() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const [publishTournamentRequest, { isLoading: publishingTournament }] = usePublishTournamentMutation();
  const tournamentData = useAppSelector(selectTournamentData);
  const [shouldOpenChangeSettings, setShouldOpenChangeSettings] = useState(false);

  const { isCreator } = useAppSelector(checkTournamentRole);

  const handlePublishTournament = async () => {
    confirm({
      title: 'Publish Tournament',
      description: `You can't change Tournament Settings after publishing. Are you sure you want to publish?`,
    }).then(async () => {
      try {
        await publishTournamentRequest(tournamentData.id).unwrap();
        dispatch(shouldRefreshTournamentData(true));
        showSuccess('Published tournament successfully.');
      } catch (error) {
        // handled error
      }
    });
  };

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

  if (shouldOpenChangeSettings) {
    return <UpdateTournament onCloseForm={() => setShouldOpenChangeSettings(false)} />;
  }

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
        {isCreator && tournamentData.phase === TournamentPhase.NEW && (
          <Button
            variant="contained"
            size="medium"
            onClick={handlePublishTournament}
            disabled={publishingTournament}
          >
            Publish tournament
          </Button>
        )}

        {isCreator && (
          <Button
            variant="outlined"
            size="medium"
            onClick={() => setShouldOpenChangeSettings(true)}
          >
            Change settings
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
