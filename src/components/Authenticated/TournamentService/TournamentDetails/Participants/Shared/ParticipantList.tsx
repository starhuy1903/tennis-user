import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import {
  DoubleParticipantInfo,
  SingleParticipantInfo,
} from 'components/Authenticated/TournamentService/Common/ParticipantInfo';
import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { ModalKey } from 'constants/modal';
import { ParticipantType } from 'constants/tournament';
import { useLazyGetRefereesQuery } from 'store/api/tournament/creator/participant';
import { useGetOpenTournamentParticipantsQuery } from 'store/api/tournament/shared/participant';
import { showModal } from 'store/slice/modalSlice';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';
import { displayDateTime } from 'utils/datetime';

import RefereeCard from './RefereeCard';

const titles = ['Name', 'Email address', 'Applied date'];

export default function ParticipantList() {
  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);
  const dispatch = useAppDispatch();

  const { data: participants, isLoading } = useGetOpenTournamentParticipantsQuery(
    {
      page: 1,
      take: 10,
      tournamentId: tournamentData.id,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [getReferees, { isLoading: fetchingRefereeData, data: referees }] = useLazyGetRefereesQuery();

  const handleGetRefereeData = useCallback(async () => {
    try {
      await getReferees(tournamentData.id).unwrap();
    } catch (err) {
      // handled error
    }
  }, [getReferees, tournamentData.id]);

  const handleAddReferee = useCallback(() => {
    dispatch(
      showModal(ModalKey.ADD_REFEREE, {
        tournamentId: tournamentData.id,
        onSubmit: handleGetRefereeData,
      })
    );
  }, [dispatch, handleGetRefereeData, tournamentData.id]);

  useEffect(() => {
    if (isCreator) {
      handleGetRefereeData();
    }
  }, [handleGetRefereeData, isCreator]);

  const renderRefereeData = () => {
    if (fetchingRefereeData) {
      return Array(3)
        .fill(null)
        .map((_, index) => (
          <Grid
            item
            key={index}
          >
            <Skeleton
              variant="rounded"
              width={300}
              height={140}
            />
          </Grid>
        ));
    }

    if (referees && referees.data.length > 0) {
      return referees.data.map((item) => (
        <Grid
          item
          key={item.id}
        >
          <RefereeCard
            name={item.name}
            image={item.image}
          />
        </Grid>
      ));
    }

    return (
      <Grid
        item
        xs={12}
      >
        <NoData />
      </Grid>
    );
  };

  return (
    <Box my={4}>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 4, bgcolor: 'white' }}
        elevation={1}
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="participant table"
        >
          <TableHead>
            <TableRow sx={{ backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' }}>
              <TableCell
                align="center"
                colSpan={titles.length}
              >
                <Typography variant="h4">Participants</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight={500}
                >
                  Team
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight={500}
                >
                  Contact info
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight={500}
                >
                  Applied date
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array(3)
                .fill(null)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={titles.length}>
                      <Skeleton
                        variant="rectangular"
                        height={30}
                      />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <>
                {participants && participants.data.length > 0 ? (
                  participants.data.map((row) => (
                    <TableRow
                      key={row.user1.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
                          {participants.participantType === ParticipantType.SINGLE ? (
                            <SingleParticipantInfo
                              image={row.user1.image}
                              name={row.user1.name}
                              shouldShowElo
                              elo={row.user1.elo}
                            />
                          ) : (
                            <DoubleParticipantInfo
                              name1={row.user1.name}
                              image1={row.user1.image}
                              name2={row.user2?.name}
                              image2={row.user2?.image}
                              shouldShowElo
                              elo1={row.user1.elo}
                              elo2={row.user2?.elo}
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Stack gap={1}>
                          <Box>{row.user1.email}</Box>
                          {row.user2 && <Box>{row.user2.email}</Box>}
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        {displayDateTime({
                          dateTime: row.appliedDate,
                          targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={titles.length}>
                      <NoData />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isCreator && (
        <Stack mt={4}>
          <Box
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4">Referees</Typography>
            <Button
              variant="contained"
              onClick={handleAddReferee}
              startIcon={<AddIcon />}
            >
              Add Referee
            </Button>
          </Box>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2 }}
          >
            {renderRefereeData()}
          </Grid>
        </Stack>
      )}
    </Box>
  );
}
