import { Box, Divider, Typography } from '@mui/material';

import { FixtureResponse, isGeneratedNewGroupPlayoffFixture } from 'types/tournament-fixtures';

import KnockoutFixtures from './KnockoutFixture';
import RoundRobinFixture from './RoundRobin';

type GroupPlayoffFixtureProps = {
  fixture: FixtureResponse;
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
};

export default function GroupPlayoffFixture({ fixture, setFixtureData }: GroupPlayoffFixtureProps) {
  return (
    <Box mt={4}>
      {isGeneratedNewGroupPlayoffFixture(fixture) && (
        <>
          <Typography
            variant="h5"
            align="center"
          >
            Group stage
          </Typography>
          {fixture.roundRobinGroups.map((roundRobinGroup, index) => (
            <RoundRobinFixture
              key={index}
              rounds={roundRobinGroup.rounds}
              setFixtureData={setFixtureData}
            />
          ))}
        </>
      )}
      <Divider sx={{ my: 5 }} />
      {isGeneratedNewGroupPlayoffFixture(fixture) && (
        <>
          <Typography
            variant="h5"
            align="center"
          >
            Knockout stage
          </Typography>
          <KnockoutFixtures
            rounds={fixture.knockoutGroup.rounds}
            setFixtureData={setFixtureData}
          />
        </>
      )}
    </Box>
  );
}
