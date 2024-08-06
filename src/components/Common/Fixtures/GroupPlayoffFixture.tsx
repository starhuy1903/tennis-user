import { Box, Chip, Divider, Stack } from '@mui/material';

import { FixtureResponse, GeneratedNewGroupPlayoffFixture } from 'types/tournament-fixtures';

import KnockoutFixtures from './KnockoutFixture';
import RoundRobinFixture from './RoundRobin';

type GroupPlayoffFixtureProps = {
  fixture: GeneratedNewGroupPlayoffFixture;
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
  isSchedule?: boolean;
};

export default function GroupPlayoffFixture({ fixture, setFixtureData, isSchedule }: GroupPlayoffFixtureProps) {
  return (
    <Box mt={4}>
      <>
        {fixture.roundRobinGroups.map((roundRobinGroup, index) => (
          <Stack
            key={roundRobinGroup.id}
            sx={{
              marginTop: 4,
            }}
          >
            <Divider>
              <Chip
                label={roundRobinGroup.title}
                size="medium"
                color="info"
                sx={{ fontSize: 20 }}
              />
            </Divider>
            <RoundRobinFixture
              key={index}
              rounds={roundRobinGroup.rounds}
              setFixtureData={setFixtureData}
              isSchedule={isSchedule}
              inGroupPlayoff
            />
          </Stack>
        ))}
      </>
      <Divider sx={{ my: 5 }}>
        <Chip
          label="Knockout"
          size="medium"
          color="success"
          sx={{ fontSize: 20 }}
        />{' '}
      </Divider>
      {fixture.knockoutGroup && (
        <KnockoutFixtures
          rounds={fixture.knockoutGroup.rounds}
          setFixtureData={setFixtureData}
          isSchedule={isSchedule}
        />
      )}
    </Box>
  );
}
