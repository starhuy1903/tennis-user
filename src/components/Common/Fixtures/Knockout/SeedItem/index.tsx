import EditIcon from '@mui/icons-material/Edit';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Chip, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { yellow } from '@mui/material/colors';
import { useCallback, useMemo } from 'react';
import { IRenderSeedProps, Seed, SeedItem } from 'react-brackets';

import { MatchStatusBadge } from 'components/Common/Match/MatchStatusBadge';
import { MatchState } from 'constants/match';
import { Match } from 'types/tournament-fixtures';

import CustomSeedTeam from './CustomSeedTeam';

type CustomSeedItemProps = IRenderSeedProps & {
  onEdit: (match: Match) => void;
  onViewDetails: (match: Match) => void;
  canEditMatch?: boolean;
  canViewDetails?: boolean;
};

export default function CustomSeedItem({
  seed,
  onEdit,
  onViewDetails,
  canEditMatch,
  canViewDetails,
}: CustomSeedItemProps) {
  const isNotClicked = seed.status === MatchState.SKIPPED;
  const isArranging = !seed.teams[0].user1 && !seed.teams[1].user1;

  const convertedMatchData = useMemo(
    () =>
      ({
        ...seed,
        matchStartDate: seed.date || '',
        teams: {
          team1: seed.teams[0],
          team2: seed.teams[1],
        },
      }) as Match,
    [seed]
  );

  const handleClickSeed = useCallback(() => {
    if (!isNotClicked && canViewDetails) {
      onViewDetails(convertedMatchData);
    }
  }, [canViewDetails, convertedMatchData, isNotClicked, onViewDetails]);

  return (
    <Seed style={{ fontSize: 16 }}>
      <SeedItem
        style={{
          backgroundColor: 'white',
          color: 'black',
          borderRadius: 5,
          position: 'relative',
        }}
      >
        {canEditMatch && !isNotClicked && seed.status !== MatchState.SCORE_DONE && (
          <Tooltip
            title="Edit"
            placement="right"
          >
            <IconButton
              sx={{
                'position': 'absolute',
                'top': 0,
                'right': 0,
                'transform': 'translate(50%, -50%)',
                'border': '1px solid',
                'borderColor': 'divider',
                'backgroundColor': 'background.paper',
                '&:hover': {
                  backgroundColor: 'background.default',
                },
              }}
              size="small"
              onClick={() => onEdit(convertedMatchData)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        <Box
          sx={{
            cursor: !isNotClicked && canViewDetails ? 'pointer' : 'default',
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
                  {seed.status === MatchState.SCORE_DONE ? (
                    <Chip
                      color="primary"
                      variant="outlined"
                      label={`${seed.team1MatchScore} - ${seed.team2MatchScore}`}
                    />
                  ) : (
                    <>
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
                    </>
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
