import { Box, Divider } from '@mui/material';
import { useCallback } from 'react';
import { IRenderSeedProps, Seed, SeedItem } from 'react-brackets';
import { useNavigate } from 'react-router-dom';

import { MatchStatusBadge } from 'components/Common/Match/MatchStatusBadge';
import { MatchStatus } from 'constants/tournament-fixtures';

import CustomSeedTeam from './CustomSeedTeam';

export default function CustomSeedItem({ seed }: IRenderSeedProps) {
  const navigate = useNavigate();

  const isNotShow = seed.status === MatchStatus.NO_SHOW;

  const handleClickSeed = useCallback(() => {
    if (!isNotShow) {
      navigate(`matches/${seed.id}`);
    }
  }, [isNotShow, navigate, seed.id]);

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
          <CustomSeedTeam
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

              <CustomSeedTeam
                match={seed}
                teamNumber={2}
              />
            </>
          )}
        </Box>
      </SeedItem>
    </Seed>
  );
}
