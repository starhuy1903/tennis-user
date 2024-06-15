import { Box, Divider } from '@mui/material';

import { FixtureResponse, isGeneratedNewGroupPlayoffFixture } from 'types/tournament-fixtures';

import KnockoutFixtures from './KnockoutFixture';
import RoundRobinFixture from './RoundRobin';

type GroupPlayoffFixtureProps = {
  fixture: FixtureResponse;
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
};

export default function GroupPlayoffFixture({ fixture, setFixtureData }: GroupPlayoffFixtureProps) {
  return (
    <Box>
      {isGeneratedNewGroupPlayoffFixture(fixture) && (
        <RoundRobinFixture
          rounds={fixture.roundRobinGroups[0].rounds}
          setFixtureData={setFixtureData}
        />
      )}
      <Divider sx={{ my: 5 }} />
      {isGeneratedNewGroupPlayoffFixture(fixture) && (
        <KnockoutFixtures
          rounds={fixture.knockoutGroup.rounds}
          setFixtureData={setFixtureData}
        />
      )}
    </Box>
  );
}
