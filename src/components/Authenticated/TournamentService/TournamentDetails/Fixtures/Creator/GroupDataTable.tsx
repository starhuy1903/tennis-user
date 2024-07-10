import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';
import { useAppSelector } from 'store';

import {
  DoubleParticipantInfo,
  SingleParticipantInfo,
} from 'components/Authenticated/TournamentService/Common/ParticipantInfo';
import { ParticipantType } from 'constants/tournament';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { GeneratedGroup } from 'types/tournament-fixtures';

type GroupDataTableProps = {
  groups: GeneratedGroup[];
};

export default function GroupDataTable({ groups }: GroupDataTableProps) {
  const tournamentData = useAppSelector(selectTournamentData);
  if (groups.length === 0) return null;

  const isSingleParticipant = tournamentData.participantType === ParticipantType.SINGLE;

  return (
    <Box
      display="flex"
      gap={2}
    >
      {groups.map((group) => (
        <Card
          sx={{
            my: 2,
            width: '200px',
          }}
        >
          <CardHeader
            title={group.title}
            titleTypographyProps={{ sx: { textAlign: 'center' } }}
          />
          <CardContent>
            <Stack spacing={1}>
              {group.teams.map((team) =>
                isSingleParticipant ? (
                  <SingleParticipantInfo
                    key={team.id}
                    name={team.user1.name}
                    image={team.user1.image}
                  />
                ) : (
                  <DoubleParticipantInfo
                    key={team.id}
                    name1={team.user1.name}
                    image1={team.user1.image}
                    name2={team.user2?.name}
                    image2={team.user2?.image}
                  />
                )
              )}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
