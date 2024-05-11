import { Box, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import Steps from 'components/Common/Steps';
import { FormatDateTime } from 'constants/datetime';
import {
  ParticipantType,
  ParticipantTypeOptions,
  TournamentFormatOptions,
  TournamentPhase,
  TournamentPhaseOptions,
} from 'constants/tournament';
import { useLazyGetGroupTournamentDetailsQuery } from 'store/api/group/groupTournamentApiSlice';
import { GroupTournament } from 'types/tournament';
import { displayDateTime } from 'utils/datetime';
import { showError } from 'utils/toast';

import InfoSection from './InfoSection';

export default function Information() {
  const navigate = useNavigate();
  const [getTournamentDetails, { isLoading }] = useLazyGetGroupTournamentDetailsQuery();
  // const [moveToNextPhase, { isLoading: isNextPhaseLoading }] = useMoveToNextPhaseMutation();

  const [tournament, setTournament] = useState<GroupTournament | null>(null);

  const { groupId, tournamentId } = useParams();

  useEffect(() => {
    (async () => {
      if (tournamentId && groupId) {
        try {
          const res = await getTournamentDetails({
            groupId: parseInt(groupId),
            tournamentId: parseInt(tournamentId),
          }).unwrap();
          setTournament(res);
        } catch (error) {
          showError('Group tournament not found.');
          navigate(`/groups/${groupId}`);
        }
      } else {
        showError('Group tournament not found.');
        navigate(`/groups/${groupId}`);
      }
    })();
  }, [getTournamentDetails, groupId, navigate, tournamentId]);

  // const handleNextPhaseClick = async () => {
  //   try {
  //     const res = await moveToNextPhase(parseInt(tournamentId!)).unwrap();

  //     setTournament(res);
  //   } catch (error) {
  //     showError('Failed to move to next phase.');
  //   }
  // };

  if (isLoading || !tournament) {
    return <CenterLoading />;
  }

  const tournamentTimelineFields = [
    { label: 'START', value: displayDateTime({ dateTime: tournament.startDate, targetFormat: FormatDateTime.DATE_2 }) },
    { label: 'ENDS', value: displayDateTime({ dateTime: tournament.endDate, targetFormat: FormatDateTime.DATE_2 }) },
    { label: 'VENUE', value: tournament.address },
  ];

  // Format, participants, gender, participant type, players born after, scope
  const tournamentDetailsFields = [
    { label: 'PARTICIPANTS', value: `${tournament.participants}` },
    { label: 'TYPE', value: ParticipantTypeOptions[ParticipantType.SINGLE] },
    { label: 'FORMAT', value: TournamentFormatOptions[tournament.format] },
  ];

  const steps = Object.values(TournamentPhaseOptions).filter(
    (phase) => phase !== TournamentPhaseOptions[TournamentPhase.FINALIZED_APPLICANTS]
  );

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

          {/* {tournament.isCreator && tournament.phase !== TournamentPhase.COMPLETED && (
            <Button
              variant="contained"
              size="medium"
              onClick={handleNextPhaseClick}
              disabled={isNextPhaseLoading}
            >
              Next Phase
            </Button>
          )} */}
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
      </Grid>
    </Grid>
  );
}
