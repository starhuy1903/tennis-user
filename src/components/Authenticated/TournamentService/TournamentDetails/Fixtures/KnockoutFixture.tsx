import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SensorsIcon from '@mui/icons-material/Sensors';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { Bracket, IRenderSeedProps, Seed, SeedItem, SeedTeam } from 'react-brackets';
import { useNavigate } from 'react-router-dom';

import { MatchStatus } from 'constants/tournament-fixtures';
import { Team, TournamentFixture, User } from 'types/tournament-fixtures';
import { formatTimeDate } from 'utils/datetime';

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

const CustomTeam = ({ team }: { team: Team }) => {
  if (!team)
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
        <CustomPlayer player={team.user1} />

        {team.user2 && <CustomPlayer player={team.user2} />}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {team?.isWinner && (
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
          {team.scores
            ?.slice()
            .reverse()
            .map((score: any, index: number) => (
              <Typography
                key={index}
                variant="body1"
                fontWeight={score.set === 'final' ? 600 : 400}
              >
                {score.game}
                {score?.tiebreak && (
                  <sup
                    style={{
                      fontSize: 10,
                      marginLeft: 2,
                    }}
                  >
                    {score.tiebreak}
                  </sup>
                )}
              </Typography>
            ))}
        </Box>
      </Box>
    </SeedTeam>
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
          <CustomTeam team={seed.teams[0] as Team} />

          {seed.status !== MatchStatus.SKIPPED && (
            <>
              <Divider>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor:
                      seed.status === MatchStatus.SCHEDULED || seed.status === MatchStatus.DONE
                        ? 'green'
                        : seed.status === MatchStatus.NO_PARTY || seed.status === MatchStatus.SCORE_DONE
                          ? 'gray'
                          : seed.status === MatchStatus.WALK_OVER
                            ? 'red'
                            : (theme) => theme.palette.info.main,
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  {seed.status === MatchStatus.SCHEDULED && formatTimeDate(seed.date!)}

                  {seed.status === MatchStatus.NO_PARTY && 'NO PARTY'}

                  {seed.status === MatchStatus.WALK_OVER && (
                    <>
                      <SensorsIcon fontSize="small" /> LIVE
                    </>
                  )}

                  {seed.status === MatchStatus.DONE && 'SCORING IN PROGRESS'}

                  {seed.status === MatchStatus.SCORE_DONE && 'FINISHED'}

                  {seed.status === MatchStatus.NO_SHOW && 'TBD'}
                </Typography>
              </Divider>

              <CustomTeam team={seed.teams[1] as Team} />
            </>
          )}
        </Box>
      </SeedItem>
    </Seed>
  );
};

export default function KnockoutFixtures({ fixture }: { fixture: TournamentFixture }) {
  return (
    <Box mt={5}>
      <Bracket
        rounds={fixture.knockoutRounds!}
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
