import { Box, Card, CardContent, CardHeader } from '@mui/material';

import { GeneratedGroup } from 'types/tournament-fixtures';

type GroupDataTableProps = {
  groups: GeneratedGroup[];
};

export default function GroupDataTable({ groups }: GroupDataTableProps) {
  if (groups.length === 0) return null;

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
          <CardHeader title={group.title} />
          <CardContent>
            {group.teams.map((team) => (
              <Box key={team.id}>{team.name}</Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
