import { Box } from '@mui/material';
import { Bracket, IRoundProps, SeedItem } from 'react-brackets';

import NoData from 'components/Common/NoData';
import { FixtureResponse, Round } from 'types/tournament-fixtures';

type KnockoutFixturesProps = {
  rounds: Round[];
  setFixtureData?: React.Dispatch<React.SetStateAction<FixtureResponse | null>>;
};

export default function KnockoutFixtures({ rounds }: KnockoutFixturesProps) {
  if (!rounds || rounds.length === 0) {
    return <NoData message="No fixtures available" />;
  }

  const mappedRounds: IRoundProps[] = rounds.map((round) => ({
    title: round.title,
    seeds: round.matches.map((match) => ({
      ...match,
      date: match.matchStartDate || '',
      teams: [match.teams.team1 || {}, match.teams.team2 || {}],
    })),
  }));

  return (
    <Box mt={5}>
      <Bracket
        rounds={mappedRounds}
        roundTitleComponent={(title) => {
          return (
            <Box
              sx={{
                color: 'white',
                backgroundColor: (theme) => theme.palette.primary.main,
                textAlign: 'center',
                fontWeight: 'bold',
                padding: 1.5,
                borderRadius: 1,
                mx: 1,
                mb: 1,
                width: 400,
              }}
            >
              {title}
            </Box>
          );
        }}
        renderSeedComponent={SeedItem}
      />
    </Box>
  );
}
