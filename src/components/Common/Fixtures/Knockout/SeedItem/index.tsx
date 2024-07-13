import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
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
  const isNotClicked = seed.status === MatchState.SKIPPED;
  const isArranging = !seed.teams[0].user1 && !seed.teams[1].user1;

  const handleClickSeed = useCallback(() => {
    if (!isNotClicked) {
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
  }, [isNotClicked, onClick, seed]);

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
            cursor: !isNotClicked ? 'pointer' : 'default',
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

          {seed.status !== MatchState.SKIPPED && (
            <>
              <Divider>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                >
                  <MatchStatusBadge
                    status={seed.status}
                    type="knockout"
                    date={seed.date}
                  />
                  {seed.isFinalMatch && (
                    <EmojiEventsIcon
                      fontSize="large"
                      sx={{
                        color: yellow[700],
                      }}
                    />
                  )}
                </Stack>
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
