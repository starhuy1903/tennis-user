import { Box, Divider, Paper, Typography } from '@mui/material';

import { FixtureResponse, GeneratedNewGroupPlayoffFixture } from 'types/tournament-fixtures';

import KnockoutFixtures from './KnockoutFixture';
import RoundRobinFixture from './RoundRobin';

type GroupPlayoffFixtureProps = {
  fixture: GeneratedNewGroupPlayoffFixture;
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
};

export default function GroupPlayoffFixture({ fixture, setFixtureData }: GroupPlayoffFixtureProps) {
  // const tournamentData = useAppSelector(selectTournamentData);
  // const { isCreator } = useAppSelector(checkTournamentRole);

  // const allRoundsDone = useMemo(
  //   () => fixture.roundRobinGroups.every((round) => round.status === 'done'),
  //   [fixture.roundRobinGroups]
  // );
  // const shouldShowKnockoutConfig = allRoundsDone && isCreator;
  // const shouldShowKnockoutFixture = allRoundsDone && fixture.knockoutGroup;

  return (
    <Box mt={4}>
      <>
        {/* <Typography
            variant="h5"
            align="center"
          >
            Group stage
          </Typography> */}
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
      <Divider sx={{ my: 5 }} />
      {fixture.knockoutGroup && (
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
