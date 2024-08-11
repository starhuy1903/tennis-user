import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FemaleIcon from '@mui/icons-material/Female';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MaleIcon from '@mui/icons-material/Male';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  Pagination,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { FormatDateTime } from 'constants/datetime';
import { Gender, TournamentStatus, TournamentStatusChip } from 'constants/tournament';
import { useGetUserProfileQuery, useGetUserTournamentsQuery } from 'store/api/userApiSlice';
import { displayDateTime } from 'utils/datetime';

import CenterLoading from '../CenterLoading';
import NoData from '../NoData';
import BaseModal from './BaseModal';
import { ShowUserProfileProps } from './types';

export default function ShowUserProfile({ userId, onModalClose }: ShowUserProfileProps) {
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const { isLoading, data: user } = useGetUserProfileQuery(userId);
  const {
    isLoading: isTournamentLoading,
    data: tournamentHistory,
    refetch,
  } = useGetUserTournamentsQuery({
    userId,
    page,
    take: 5,
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const renderBody = () => {
    if (isLoading || isTournamentLoading) {
      return <CenterLoading />;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Avatar
            src={user?.image}
            sx={{ width: 100, height: 100, border: '2px solid white' }}
          />

          <Chip
            label={`${user?.elo || 'No'} ELO`}
            size="small"
            variant={user?.elo ? 'filled' : 'outlined'}
            color="primary"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: user?.elo ? theme.palette.primary.main : 'white',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h6">{user?.name}</Typography>

            {user?.gender === Gender.MALE && (
              <Tooltip title="Gender: Male">
                <MaleIcon
                  fontSize="small"
                  sx={{
                    color: '#008DDA',
                  }}
                />
              </Tooltip>
            )}
            {user?.gender === Gender.FEMALE && (
              <Tooltip title="Gender: Female">
                <FemaleIcon
                  fontSize="small"
                  sx={{
                    color: '#FC819E',
                  }}
                />
              </Tooltip>
            )}
          </Stack>
          <Typography variant="subtitle1">{user?.email}</Typography>
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Typography
          variant="h6"
          color="primary"
        >
          Match Statistics
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 8,
          }}
        >
          <Tooltip title="Number of matches played">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="h3">{tournamentHistory?.statistic?.total}</Typography>
            </Box>
          </Tooltip>
          <Divider
            orientation="vertical"
            flexItem
          />
          <Tooltip title="Number of won matches">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1">Win</Typography>
              <Typography variant="h3">{tournamentHistory?.statistic?.win}</Typography>
            </Box>
          </Tooltip>
          <Divider
            orientation="vertical"
            flexItem
          />
          <Tooltip title="Number of lost matches">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1">Lose</Typography>
              <Typography variant="h3">{tournamentHistory?.statistic?.lose}</Typography>
            </Box>
          </Tooltip>
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
        >
          <Typography
            variant="h6"
            color="primary"
          >
            Tournament History
          </Typography>
        </Stack>

        <Stack
          direction="column"
          justifyContent="center"
          spacing={1}
        >
          {tournamentHistory?.tournaments?.data && tournamentHistory?.tournaments?.data.length > 0 ? (
            tournamentHistory?.tournaments?.data.map((tournament) => (
              <CardActionArea>
                <Card>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={tournament?.image}
                      alt="tournament"
                    />

                    <Chip
                      icon={
                        tournament?.status === TournamentStatus.UPCOMING ? (
                          <EmojiEventsIcon />
                        ) : tournament?.status === TournamentStatus.ON_GOING ? (
                          <LocalFireDepartmentIcon />
                        ) : (
                          <WorkspacePremiumIcon />
                        )
                      }
                      label={TournamentStatusChip[tournament?.status].label}
                      color={TournamentStatusChip[tournament?.status].color}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1,
                        color: 'white',
                      }}
                    />
                  </Box>

                  <CardHeader
                    title={<Typography variant="h6">{tournament?.name}</Typography>}
                    subheader={`Applied date: ${displayDateTime({
                      dateTime: tournament?.appliedDate,
                      targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
                    })}`}
                  />
                </Card>
              </CardActionArea>
            ))
          ) : (
            <NoData message="This user has not participated in any tournament yet." />
          )}
        </Stack>

        <Pagination
          count={tournamentHistory?.tournaments?.totalPages || 1}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    );
  };

  return (
    <BaseModal
      headerText="User Profile"
      onModalClose={onModalClose}
      body={renderBody()}
      primaryButtonText="Ok"
      onClickPrimaryButton={() => {
        onModalClose();
      }}
      size="sm"
    />
  );
}
