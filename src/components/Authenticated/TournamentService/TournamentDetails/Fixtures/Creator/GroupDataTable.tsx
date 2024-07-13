import { Box, Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
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
            titleTypographyProps={{ sx: { textAlign: 'center', fontSize: '18px' } }}
            sx={{ backgroundColor: deepPurple[100] }}
          />
          <Divider />
          <CardContent sx={{ backgroundColor: 'white' }}>
            <Stack spacing={1}>
              {group.teams.map((team, index) => (
                <Box key={team.id}>
                  {index !== 0 && <Divider sx={{ mb: 1 }} />}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {index + 1}.
                    </Typography>
                    {isSingleParticipant ? (
                      <SingleParticipantInfo
                        name={team.user1.name}
                        image={team.user1.image}
                      />
                    ) : (
                      <DoubleParticipantInfo
                        name1={team.user1.name}
                        image1={team.user1.image}
                        name2={team.user2?.name}
                        image2={team.user2?.image}
                      />
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
