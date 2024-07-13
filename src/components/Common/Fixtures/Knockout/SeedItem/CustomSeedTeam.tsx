import { Avatar, Stack } from '@mui/material';
import { SeedTeam } from 'react-brackets';

import {
  DoubleParticipantInfo,
  SingleParticipantInfo,
} from 'components/Authenticated/TournamentService/Common/ParticipantInfo';
import { Match } from 'types/tournament-fixtures';

import ScoreList from './ScoreList';

type CustomSeedTeamProps = {
  match: Match | any;
  teamNumber: 1 | 2;
};

export default function CustomSeedTeam({ match, teamNumber }: CustomSeedTeamProps) {
  if (
    !match ||
    !match.teams[teamNumber - 1] ||
    Object.keys(match.teams[teamNumber - 1]).length === 0
    // match.status === MatchState.NO_SHOW
  ) {
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
  }

  const player1 = match.teams[teamNumber - 1].user1;
  const player2 = match.teams[teamNumber - 1].user2;

  return (
    <SeedTeam
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 15,
      }}
    >
      <Stack gap={2}>
        {!player2 ? (
          <DoubleParticipantInfo
            name1={player1.name}
            image1={player1.image}
            name2={player1.name}
            image2={player1.image}
          />
        ) : (
          <SingleParticipantInfo
            name={player1.name}
            image={player1.image}
          />
        )}
      </Stack>

      <ScoreList
        match={match}
        teamNumber={teamNumber}
      />
    </SeedTeam>
  );
}
