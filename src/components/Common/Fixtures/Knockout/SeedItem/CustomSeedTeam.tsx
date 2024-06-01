import { Avatar, Box } from '@mui/material';
import { SeedTeam } from 'react-brackets';

import { MatchStatus } from 'constants/tournament-fixtures';
import { Match } from 'types/tournament-fixtures';

import ScoreList from './ScoreList';
import TeamPlayer from './TeamPlayer';

export default function CustomSeedTeam({ match, teamNumber }: { match: Match | any; teamNumber: 1 | 2 }) {
  if (
    !match ||
    !match.teams[teamNumber - 1] ||
    Object.keys(match.teams[teamNumber - 1]).length === 0 ||
    match.status === MatchStatus.NO_SHOW
  )
    return (
      <SeedTeam
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <Avatar
          alt="avatar"
          sx={{ width: '50px', height: '50px' }}
        />
      </SeedTeam>
    );

  return (
    <SeedTeam
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TeamPlayer player={match.teams[teamNumber - 1].user1} />

        {match.teams[teamNumber - 1].user2 && <TeamPlayer player={match.teams[teamNumber - 1].user2} />}
      </Box>

      <ScoreList
        match={match}
        teamNumber={teamNumber}
      />
    </SeedTeam>
  );
}
