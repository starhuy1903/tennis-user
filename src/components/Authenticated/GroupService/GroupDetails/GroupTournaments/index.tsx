import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

import { Breadcrumbs } from 'components/Common/Breadcrumb';
import CenterLoading from 'components/Common/CenterLoading';
import { TournamentStatus } from 'constants/tournament';
import { useLazyGetGroupDetailsQuery } from 'store/api/group/groupApiSlice';
import { useLazyGetGroupTournamentsQuery } from 'store/api/group/groupTournamentApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { GroupTournament } from 'types/tournament';

import GroupTournamentList from './GroupTournamentList';

export default function GroupTournaments() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const groupData = useAppSelector(selectGroup);

  const [tournaments, setTournaments] = useState<{
    upcoming: GroupTournament[];
    onGoing: GroupTournament[];
    completed: GroupTournament[];
  }>({
    upcoming: [],
    onGoing: [],
    completed: [],
  });

  const [getTournaments, { isLoading }] = useLazyGetGroupTournamentsQuery();
  const [getGroupDetails, { isLoading: isLoadingGroup }] = useLazyGetGroupDetailsQuery();

  useEffect(() => {
    (async () => {
      if (!groupId) {
        navigate('/groups');
        return;
      }

      if (groupData.id === 0) {
        try {
          await getGroupDetails(parseInt(groupId));
          return;
        } catch (error) {
          navigate('/groups');
          return;
        }
      }

      try {
        const responses = await Promise.all([
          getTournaments({ tournamentStatus: TournamentStatus.UPCOMING, groupId: groupData.id }).unwrap(),
          getTournaments({ tournamentStatus: TournamentStatus.ON_GOING, groupId: groupData.id }).unwrap(),
          getTournaments({ tournamentStatus: TournamentStatus.COMPLETED, groupId: groupData.id }).unwrap(),
        ]);
        setTournaments({
          upcoming: responses[0],
          onGoing: responses[1],
          completed: responses[2],
        });
      } catch (error) {
        // handled error
      }
    })();
  }, [getGroupDetails, getTournaments, groupData.id, groupId, navigate]);

  const handleCreateTournament = () => {
    navigate(`/groups/${groupData?.id}/tournaments/create`);
  };

  const customRoutes = useMemo(
    () => [
      {
        path: '/groups/:groupId',
        breadcrumb: groupData.name,
      },
    ],
    [groupData.name]
  );

  if (isLoading || isLoadingGroup || groupData.id === 0) {
    return <CenterLoading />;
  }

  return (
    <Stack>
      <Breadcrumbs customRoutes={customRoutes} />

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
            <EmojiEventsIcon />
            <Typography
              variant="h5"
              fontWeight={500}
            >
              Upcoming Tournaments
            </Typography>
          </Stack>
          {groupData?.isCreator && (
            <Button
              variant="outlined"
              onClick={handleCreateTournament}
            >
              Create tournament
            </Button>
          )}
        </Stack>
        <GroupTournamentList tournaments={tournaments.upcoming} />
      </Box>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
        >
          <EmojiEventsIcon />
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
          <WorkspacePremiumIcon />
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
