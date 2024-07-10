import { Box, Divider, Paper, Typography } from '@mui/material';

import { FixtureResponse, isGeneratedNewGroupPlayoffFixture } from 'types/tournament-fixtures';

// import KnockoutFixtures from './KnockoutFixture';
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
            <Paper
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
      )}
      <Divider sx={{ my: 5 }} />
      {/* {isGeneratedNewGroupPlayoffFixture(fixture) && (
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
      )} */}
    </Box>
  );
}
