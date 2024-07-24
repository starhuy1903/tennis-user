import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Match } from 'types/tournament-fixtures';

import { DoubleParticipantInfo, SingleParticipantInfo } from '../../Common/ParticipantInfo';

export default function RecentMatch({
  match,
  isSinglePlayer,
  onClick,
}: {
  match: Match;
  isSinglePlayer: boolean;
  onClick: () => void;
}) {
  return (
    <Box
      sx={{
        'border': '1px solid',
        'borderRadius': 4,
        'borderColor': 'divider',
        '&:hover': {
          bgcolor: grey[200],
          cursor: 'pointer',
        },
      }}
      p={2}
      onClick={onClick}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={6}
      >
        <Stack
          gap={1}
          width={140}
        >
          {isSinglePlayer ? (
            <>
              <SingleParticipantInfo
                name={match.teams.team1.user1.name}
                image={match.teams.team1.user1.image}
                imageSx={{ width: 30, height: 30 }}
                nameTypographyProps={{ fontSize: 12 }}
              />
              <Divider>
                <Typography
                  fontSize={12}
                  color={grey[500]}
                >
                  vs
                </Typography>
              </Divider>
              <SingleParticipantInfo
                name={match.teams.team2.user1.name}
                image={match.teams.team2.user1.image}
                imageSx={{ width: 30, height: 30 }}
                nameTypographyProps={{ fontSize: 12 }}
              />
            </>
          ) : (
            <>
              <DoubleParticipantInfo
                name1={match.teams.team1.user1.name}
                image1={match.teams.team1.user1.image}
                name2={match.teams.team1.user2?.name}
                image2={match.teams.team1.user2?.image}
              />
              <DoubleParticipantInfo
                name1={match.teams.team2.user1.name}
                image1={match.teams.team2.user1.image}
                name2={match.teams.team2.user2?.name}
                image2={match.teams.team2.user2?.image}
              />
            </>
          )}
        </Stack>
        <Stack gap={3.5}>
          <Box
            display="flex"
            alignItems="center"
          >
            <ArrowLeftIcon />
            <Typography
              variant="caption"
              fontWeight={700}
            >
              2
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <Box
              width={24}
              height={24}
            ></Box>
            <Typography
              variant="caption"
              color={grey[600]}
            >
              1
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
