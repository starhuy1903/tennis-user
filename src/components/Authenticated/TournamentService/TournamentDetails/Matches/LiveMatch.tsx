import { Box, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Match } from 'types/tournament-fixtures';

import LiveBadge from '../../Common/LiveBadge';
import { DoubleParticipantInfo, SingleParticipantInfo } from '../../Common/ParticipantInfo';

type LiveMatchProps = {
  match: Match;
  onClick: () => void;
};

export default function LiveMatch({ match, onClick }: LiveMatchProps) {
  const isSinglePlayerMatch = match.teams.team1?.user1 && !match.teams.team1?.user2;
  return (
    <Box
      sx={{
        'border': '1px solid',
        'borderRadius': 4,
        'borderColor': 'divider',
        '&:hover': {
          bgcolor: grey[200],
          cursor: 'pointer',
        },
      }}
      p={2}
      onClick={onClick}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={6}
        justifyContent="space-between"
      >
        <Stack gap={1}>
          {isSinglePlayerMatch ? (
            <>
              <SingleParticipantInfo
                name={match.teams.team1.user1.name}
                image={match.teams.team1.user1.image}
                imageSx={{ width: 30, height: 30 }}
                nameTypographyProps={{ fontSize: 12 }}
              />
              <SingleParticipantInfo
                name={match.teams.team2.user1.name}
                image={match.teams.team2.user1.image}
                imageSx={{ width: 30, height: 30 }}
                nameTypographyProps={{ fontSize: 12 }}
              />
            </>
          ) : (
            <>
              <DoubleParticipantInfo
                name1={match.teams.team1.user1.name}
                image1={match.teams.team1.user1.image}
                name2={match.teams.team1.user2?.name}
                image2={match.teams.team1.user2?.image}
              />
              <DoubleParticipantInfo
                name1={match.teams.team2.user1.name}
                image1={match.teams.team2.user1.image}
                name2={match.teams.team2.user2?.name}
                image2={match.teams.team2.user2?.image}
              />
            </>
          )}
        </Stack>
        <LiveBadge />
      </Box>
    </Box>
  );
}
