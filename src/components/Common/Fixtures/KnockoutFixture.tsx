import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { Bracket, IRenderSeedProps, Seed, SeedItem, SeedTeam } from 'react-brackets';
import { useNavigate } from 'react-router-dom';

import { MatchStatus } from 'constants/tournament-fixtures';
import { Match, Round, User } from 'types/tournament-fixtures';

import { MatchStatusBadge } from '../Match/MatchStatusBadge';
import NoData from '../NoData';

const CustomPlayer = ({ player }: { player: User }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Avatar
        src={player.image}
        alt={player.name}
        sx={{ width: '50px', height: '50px' }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          variant="body1"
          fontWeight={600}
        >
          {player.name}
        </Typography>
        <Typography variant="caption">{player.elo} ELO</Typography>
      </Box>
    </Box>
  );
};

const CustomTeam = ({ match, teamNumber }: { match: Match | any; teamNumber: 1 | 2 }) => {
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
        <CustomPlayer player={match.teams[teamNumber - 1].user1} />

        {match.teams[teamNumber - 1].user2 && <CustomPlayer player={match.teams[teamNumber - 1].user2} />}
      </Box>

      <ScoreList
        match={match}
        teamNumber={teamNumber}
      />
    </SeedTeam>
  );
};

const ScoreList = ({ match, teamNumber }: { match: Match | any; teamNumber: 1 | 2 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {match.teams[teamNumber - 1].isWinner && (
        <ArrowRightIcon
          color="primary"
          fontSize="large"
        />
      )}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mr: 2,
        }}
      >
        {match.finalScore && (
          <Typography
            variant="body1"
            fontWeight={600}
          >
            {match.finalScore[`team${teamNumber}`]}
          </Typography>
        )}

        {match.scores
          ?.slice()
          .reverse()
          .map((score: any, index: number) => (
            <Typography
              key={index}
              variant="body1"
            >
              {score[`team${teamNumber}`]}
              {score[`tiebreakTeam${teamNumber}`] && (
                <sup
                  style={{
                    fontSize: 10,
                    marginLeft: 2,
                  }}
                >
                  {score[`tiebreakTeam${teamNumber}`]}
                </sup>
              )}
            </Typography>
          ))}
      </Box>
    </Box>
  );
};

const CustomSeed = ({ seed }: IRenderSeedProps) => {
  const navigate = useNavigate();

  return (
    <Seed style={{ fontSize: 16 }}>
      <SeedItem
        style={{
          backgroundColor: 'white',
          color: 'black',
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            cursor: seed.status !== MatchStatus.NO_SHOW ? 'pointer' : 'default',
          }}
          onClick={() => {
            if (seed.status !== MatchStatus.NO_SHOW) {
              navigate(`matches/${seed.id}`);
            }
          }}
        >
          <CustomTeam
            match={seed}
            teamNumber={1}
          />

          {seed.status !== MatchStatus.SKIPPED && (
            <>
              <Divider>
                <MatchStatusBadge
                  status={seed.status}
                  type="knockout"
                  date={seed.date}
                />
              </Divider>

              <CustomTeam
                match={seed}
                teamNumber={2}
              />
            </>
          )}
        </Box>
      </SeedItem>
    </Seed>
  );
};

export default function KnockoutFixtures({ rounds }: { rounds: Round[] }) {
  if (!rounds || rounds.length === 0) {
    return <NoData message="No fixtures available" />;
  }

  const mappedRounds = rounds.map((round) => ({
    title: round.title,
    seeds: round.matches.map((match) => ({
      ...match,
      teams: [match.teams.team1 || {}, match.teams.team2 || {}],
    })),
  }));

  return (
    <Box mt={5}>
      <Bracket
        rounds={mappedRounds}
        roundTitleComponent={(title: React.ReactNode) => {
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
        renderSeedComponent={CustomSeed}
      />
    </Box>
  );
}
