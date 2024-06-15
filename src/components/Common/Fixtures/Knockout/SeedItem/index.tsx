import { Box, Divider, Typography } from '@mui/material';
import { useCallback } from 'react';
import { IRenderSeedProps, Seed, SeedItem } from 'react-brackets';

import { MatchStatusBadge } from 'components/Common/Match/MatchStatusBadge';
import { MatchState } from 'constants/match';
import { Match } from 'types/tournament-fixtures';

import CustomSeedTeam from './CustomSeedTeam';

type CustomSeedItemProps = IRenderSeedProps & {
  onClick?: (match: Match) => void;
};

export default function CustomSeedItem({ seed, onClick }: CustomSeedItemProps) {
  const isNotShow = seed.status === MatchState.NO_SHOW;
  const isArranging = !seed.teams[0].user1 && !seed.teams[1].user1;

  const handleClickSeed = useCallback(() => {
    if (!isNotShow) {
      const match = {
        ...seed,
        matchStartDate: seed.date || '',
        teams: {
          team1: seed.teams[0],
          team2: seed.teams[1],
        },
      } as Match;

      onClick?.(match);
    }
  }, [isNotShow, onClick, seed]);

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
            cursor: !isNotShow ? 'pointer' : 'default',
          }}
          onClick={handleClickSeed}
        >
          {isArranging ? (
            <Box p={2}>
              <Typography textAlign="start">{seed.teams[0].name}</Typography>
            </Box>
          ) : (
            <CustomSeedTeam
              match={seed}
              teamNumber={1}
            />
          )}

          {seed.status !== MatchState.NO_SHOW && (
            <>
              <Divider>
                <MatchStatusBadge
                  status={seed.status}
                  type="knockout"
                  date={seed.date}
                />
              </Divider>

              {isArranging ? (
                <Box p={2}>
                  <Typography textAlign="start">{seed.teams[1].name}</Typography>
                </Box>
              ) : (
                <CustomSeedTeam
                  match={seed}
                  teamNumber={2}
                />
              )}
            </>
          )}
        </Box>
      </SeedItem>
    </Seed>
  );
}
