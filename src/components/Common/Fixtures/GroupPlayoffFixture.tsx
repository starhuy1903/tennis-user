import { Box, Divider, Paper, Typography } from '@mui/material';

import { FixtureResponse, GeneratedNewGroupPlayoffFixture } from 'types/tournament-fixtures';

import KnockoutFixtures from './KnockoutFixture';
import RoundRobinFixture from './RoundRobin';

type GroupPlayoffFixtureProps = {
  fixture: GeneratedNewGroupPlayoffFixture;
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
};

export default function GroupPlayoffFixture({ fixture, setFixtureData }: GroupPlayoffFixtureProps) {
  return (
    <Box mt={4}>
      <>
        {fixture.roundRobinGroups.map((roundRobinGroup, index) => (
          <Paper
            key={roundRobinGroup.id}
            elevation={1}
            sx={{
              padding: 4,
              borderRadius: 2,
              backgroundColor: 'white',
              marginTop: 4,
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: 500,
              }}
            >
              {roundRobinGroup.title}
            </Typography>
            <RoundRobinFixture
              key={index}
              rounds={roundRobinGroup.rounds}
              setFixtureData={setFixtureData}
            />
          </Paper>
        ))}
      </>
      <Divider sx={{ my: 5 }} />
      {fixture.knockoutGroup && (
        <KnockoutFixtures
          rounds={fixture.knockoutGroup.rounds}
          setFixtureData={setFixtureData}
        />
      )}
    </Box>
  );
}
