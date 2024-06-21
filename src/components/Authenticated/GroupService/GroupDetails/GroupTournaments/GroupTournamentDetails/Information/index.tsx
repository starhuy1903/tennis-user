import { Button, Divider, Grid, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import InfoSection from 'components/Common/InfoSection';
import { FormatDateTime } from 'constants/datetime';
import { GroupTournamentFormatOptions, GroupTournamentPhase } from 'constants/group-tournament';
import { ParticipantType, ParticipantTypeOptions } from 'constants/tournament';
import {
  usePublishGroupTournamentMutation,
  useUnpublishGroupTournamentMutation,
} from 'store/api/group/groupTournamentApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournamentData, shouldRefreshGroupTournamentData } from 'store/slice/groupTournamentSlice';
import { displayDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

import UpdateGroupTournament from './UpdateTournament';

const displayDate = (date: string) => {
  return displayDateTime({
    dateTime: date,
    targetFormat: FormatDateTime.DATE_2,
  });
};

export default function Information() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const [publishTournamentRequest, { isLoading: publishingTournament }] = usePublishGroupTournamentMutation();
  const [unpublishTournamentRequest, { isLoading: unpublishingTournament }] = useUnpublishGroupTournamentMutation();

  const groupData = useAppSelector(selectGroup);
  const tournamentData = useAppSelector(selectGroupTournamentData);
  const [shouldOpenChangeSettings, setShouldOpenChangeSettings] = useState(false);

  const handlePublishTournament = async () => {
    confirm({
      title: 'Publish Tournament',
      description: `You can't change Tournament Settings after publishing. Are you sure you want to publish?`,
    }).then(async () => {
      try {
        await publishTournamentRequest({
          groupId: groupData.id,
          tournamentId: tournamentData.id,
        }).unwrap();
        dispatch(shouldRefreshGroupTournamentData(true));
        showSuccess('Published tournament successfully.');
      } catch (error) {
        // handled error
      }
    });
  };

  const handleUnpublishTournament = async () => {
    confirm({
      title: 'Unpublish Tournament',
      description: `Unpublishing the tournament will make it invisible to the public. Are you sure you want to unpublish?`,
    }).then(async () => {
      try {
        await unpublishTournamentRequest({
          groupId: groupData.id,
          tournamentId: tournamentData.id,
        }).unwrap();
        dispatch(shouldRefreshGroupTournamentData(true));
        showSuccess('Unpublished tournament successfully.');
      } catch (error) {
        // handled error
      }
    });
  };

  const tournamentTimelineFields = [
    { label: 'START', value: displayDate(tournamentData.startDate) },
    { label: 'ENDS', value: displayDate(tournamentData.endDate) },
    { label: 'VENUE', value: tournamentData.address },
  ];

  // Format, participants, gender, participant type, players born after, scope
  const tournamentDetailsFields = [
    { label: 'PARTICIPANTS', value: `${tournamentData.participants}` },
    { label: 'TYPE', value: ParticipantTypeOptions[ParticipantType.SINGLE] },
    { label: 'FORMAT', value: GroupTournamentFormatOptions[tournamentData.format] },
  ];

  if (shouldOpenChangeSettings) {
    return <UpdateGroupTournament onCloseForm={() => setShouldOpenChangeSettings(false)} />;
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
        xs={6}
        md={8}
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
        xs={6}
        md={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {tournamentData.isCreator && tournamentData.phase === GroupTournamentPhase.NEW && (
          <Button
            variant="contained"
            size="medium"
            onClick={handlePublishTournament}
            disabled={publishingTournament}
          >
            Publish tournament
          </Button>
        )}

        {tournamentData.isCreator && tournamentData.phase === GroupTournamentPhase.PUBLISHED && (
          <Button
            variant="contained"
            size="medium"
            onClick={handleUnpublishTournament}
            disabled={unpublishingTournament}
          >
            Unpublish tournament
          </Button>
        )}

        {tournamentData.isCreator && (
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
      </Grid>
    </Grid>
  );
}
