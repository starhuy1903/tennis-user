import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { TournamentStatus } from 'constants/tournament';
import {
  useLazyGetGroupTournamentsQuery,
  useLazyGetUnregisteredGroupTournamentsQuery,
} from 'store/api/group/groupTournamentApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { GroupTournament } from 'types/tournament';

import GroupTournamentList from './GroupTournamentList';

export default function AllTournaments() {
  const navigate = useNavigate();
  const groupData = useAppSelector(selectGroup);

  const [tournaments, setTournaments] = useState<{
    upcoming: GroupTournament[];
    onGoing: GroupTournament[];
    completed: GroupTournament[];
    unregistered: GroupTournament[];
  }>({
    upcoming: [],
    onGoing: [],
    completed: [],
    unregistered: [],
  });

  const [getTournaments, { isLoading: fetchingTournament }] = useLazyGetGroupTournamentsQuery();
  const [getUnregisteredTournaments, { isLoading: fetchingUnregisteredTournaments }] =
    useLazyGetUnregisteredGroupTournamentsQuery();

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          getTournaments({ tournamentStatus: TournamentStatus.UPCOMING, groupId: groupData.id }).unwrap(),
          getTournaments({ tournamentStatus: TournamentStatus.ON_GOING, groupId: groupData.id }).unwrap(),
          getTournaments({ tournamentStatus: TournamentStatus.COMPLETED, groupId: groupData.id }).unwrap(),
          getUnregisteredTournaments(groupData.id).unwrap(),
        ]);
        setTournaments({
          upcoming: responses[0],
          onGoing: responses[1],
          completed: responses[2],
          unregistered: responses[3],
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [getTournaments, getUnregisteredTournaments, groupData.id]);

  const handleCreateTournament = () => {
    navigate(`/groups/${groupData?.id}/tournaments/create`);
  };

  if (fetchingTournament || fetchingUnregisteredTournaments) {
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
            <NewReleasesIcon color="primary" />
            <Typography
              variant="h5"
              fontWeight={500}
            >
              New Tournaments
            </Typography>
          </Stack>

          <Button
            variant="contained"
            size="small"
            onClick={handleCreateTournament}
          >
            Create tournament
          </Button>
        </Stack>
        {tournaments.unregistered.length !== 0 ? (
          <GroupTournamentList tournaments={tournaments.unregistered} />
        ) : (
          <NoData message="There are no new tournaments to join." />
        )}
      </Box>

      <Box>
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
            Upcoming Tournaments
          </Typography>
        </Stack>
        <GroupTournamentList tournaments={tournaments.upcoming} />
      </Box>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <LocalFireDepartmentIcon
            sx={{
              color: '#F08A5D',
            }}
          />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Ongoing Tournaments
          </Typography>
        </Stack>

        <GroupTournamentList tournaments={tournaments.onGoing} />
      </Box>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <WorkspacePremiumIcon
            sx={{
              color: '#FF2E63',
            }}
          />
          <Typography
            variant="h5"
            fontWeight={500}
          >
            Completed Tournaments
          </Typography>
        </Stack>

        <GroupTournamentList tournaments={tournaments.completed} />
      </Box>
    </Stack>
  );
}
