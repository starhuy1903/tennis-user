import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Stack, Typography } from '@mui/material';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { useGetCreatedGroupTournamentsQuery } from 'store/api/group/group-tournaments/creator/general';
import { selectGroup } from 'store/slice/groupSlice';

import GroupTournamentList from './GroupTournamentList';

export default function ManageTournaments() {
  const groupData = useAppSelector(selectGroup);

  const { data: tournaments, isLoading } = useGetCreatedGroupTournamentsQuery(groupData.id);

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Stack gap={4}>
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            <EmojiEventsIcon
              sx={{
                color: '#FF8A08',
              }}
            />
            <Typography
              variant="h5"
              fontWeight={500}
            >
              My Created Tournaments
            </Typography>
          </Stack>
        </Stack>
        {tournaments && tournaments.length > 0 ? (
          <GroupTournamentList tournaments={tournaments} />
        ) : (
          <NoData message="No tournaments found." />
        )}
      </Box>
    </Stack>
  );
}
