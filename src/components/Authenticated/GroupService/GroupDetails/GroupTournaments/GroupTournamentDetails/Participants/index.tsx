import DoneIcon from '@mui/icons-material/Done';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
  Alert,
  Avatar,
  Box,
  Fab,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import OverlayCenterLoading from 'components/Common/OverlayCenterLoading';
import { FormatDateTime } from 'constants/datetime';
import { MemberRoleOptions } from 'constants/group';
import { GroupTournamentPhase } from 'constants/group-tournament';
import { ModalKey } from 'constants/modal';
import { GenderOptions } from 'constants/tournament';
import {
  useFinalizeApplicantGroupTournamentMutation,
  useLazyGetRefereesGroupTournamentQuery,
  useRemoveParticipantMutation,
  useRemoveRefereeMutation,
} from 'store/api/group/group-tournaments/creator/participant';
import { useLazyGetGroupTournamentParticipantsQuery } from 'store/api/group/group-tournaments/shared/participants';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournament, shouldRefreshGroupTournamentData } from 'store/slice/groupTournamentSlice';
import { showModal } from 'store/slice/modalSlice';
import { displayDateTime } from 'utils/datetime';
import { checkFinalizedApplicants } from 'utils/group-tournament';
import { showSuccess } from 'utils/toast';

const titles = ['Name', 'Email address', 'Role', 'Joined at', ''];
const refereeTableTitles = ['Name', 'Email address', 'Phone number', 'Gender', ''];

export default function Participants() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const groupData = useAppSelector(selectGroup);
  const { data: tournamentData } = useAppSelector(selectGroupTournament);

  const { tournamentId } = useParams();

  const [isFetched, setIsFetched] = useState(false);
  const [fetchingParticipants, setFetchingParticipants] = useState(false);
  const [getPaticipants, { data: tournamentParticipants }] = useLazyGetGroupTournamentParticipantsQuery();
  const [getReferees, { isLoading: fetchingReferees, data: tournamentReferees }] =
    useLazyGetRefereesGroupTournamentQuery();
  const [removeParticipant, { isLoading: isRemoveLoading }] = useRemoveParticipantMutation();
  const [removeReferee, { isLoading: isRemoveRefereeLoading }] = useRemoveRefereeMutation();
  const [finalizeApplicantRequest, { isLoading: isFinalizing }] = useFinalizeApplicantGroupTournamentMutation();

  const handleGetParticipantsData = useCallback(async () => {
    if (tournamentData.phase === GroupTournamentPhase.NEW) {
      return;
    }
    try {
      setFetchingParticipants(true);
      await getPaticipants({ groupId: groupData.id, tournamentId: parseInt(tournamentId!) }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingParticipants(false);
    }
  }, [getPaticipants, groupData.id, tournamentData.phase, tournamentId]);

  const handleAddParticipant = useCallback(() => {
    dispatch(
      showModal(ModalKey.ADD_PARTICIPANTS, {
        groupId: groupData.id,
        tournamentId: parseInt(tournamentId!),
        refetchParticipantsData: handleGetParticipantsData,
      })
    );
  }, [dispatch, groupData.id, handleGetParticipantsData, tournamentId]);

  const handleRemoveParticipant = (userId: string, name: string) => {
    confirm({ description: `This action will remove ${name} from this tournament.` })
      .then(async () => {
        try {
          await removeParticipant({ groupId: groupData.id, tournamentId: parseInt(tournamentId!), userId }).unwrap();
          await handleGetParticipantsData();
          showSuccess(`Removed ${name} from the tournament successfully.`);
        } catch (error) {
          // handle error
        }
      })
      .catch(() => {});
  };

  const handleGetRefereesData = useCallback(async () => {
    try {
      await getReferees({ groupId: groupData.id, tournamentId: tournamentData.id }).unwrap();
    } catch (err) {
      // handled error
    }
  }, [getReferees, groupData.id, tournamentData.id]);

  const handleAddReferee = useCallback(() => {
    dispatch(
      showModal(ModalKey.ADD_REFEREE_GROUP_TOURNAMENT, {
        groupId: groupData.id,
        tournamentId: tournamentData.id,
        refetchRefereesData: handleGetRefereesData,
      })
    );
  }, [dispatch, groupData.id, handleGetRefereesData, tournamentData.id]);

  const handleRemoveReferee = (userId: string, name: string) => {
    confirm({ description: `This action will remove ${name} from the referee list.` })
      .then(async () => {
        try {
          await removeReferee({ groupId: groupData.id, tournamentId: parseInt(tournamentId!), userId }).unwrap();
          await handleGetRefereesData();
          showSuccess(`Removed ${name} from the referee list successfully.`);
        } catch (error) {
          // handle error
        }
      })
      .catch(() => {});
  };

  const handleFinalizeParticipants = useCallback(() => {
    confirm({
      title: 'Confirmation',
      description: 'After finalizing, you cannot change the Tournament Timeline. Are you sure you want to finalize?',
    }).then(async () => {
      try {
        await finalizeApplicantRequest({ groupId: groupData.id, tournamentId: tournamentData.id }).unwrap();
        dispatch(shouldRefreshGroupTournamentData(true));
        showSuccess('Finalized participant successfully');
      } catch (e) {
        // handled error
      }
    });
  }, [confirm, dispatch, finalizeApplicantRequest, groupData.id, tournamentData.id]);

  useEffect(() => {
    handleGetParticipantsData();
    if (groupData.isCreator) {
      handleGetRefereesData();
    }
    setIsFetched(true);
  }, [groupData.isCreator, handleGetParticipantsData, handleGetRefereesData]);

  if (fetchingParticipants && !isFetched) {
    return <CenterLoading />;
  }

  if (tournamentData.phase === GroupTournamentPhase.NEW) {
    return (
      <Box mt={4}>
        <Alert severity="info">
          You need to publish the tournament first in the{' '}
          <Link to={`/groups/${groupData.id}/tournaments/${tournamentData.id}/info`}>Information</Link> tab.
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box my={5}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginY: 2,
            height: '60px',
          }}
        >
          <Typography variant="h4">Participants</Typography>

          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            {tournamentParticipants &&
              tournamentParticipants.isCreator &&
              !checkFinalizedApplicants(tournamentData.phase) && (
                <Tooltip title="Add participant">
                  <Fab
                    size="medium"
                    color="primary"
                    onClick={handleAddParticipant}
                    disabled={isRemoveLoading || fetchingParticipants || isFinalizing}
                  >
                    <PersonAddIcon />
                  </Fab>
                </Tooltip>
              )}

            {tournamentParticipants &&
              tournamentParticipants.isCreator &&
              !checkFinalizedApplicants(tournamentData.phase) && (
                <Tooltip title="Finalize participants">
                  <Fab
                    size="medium"
                    color="success"
                    onClick={handleFinalizeParticipants}
                    disabled={
                      isRemoveLoading || fetchingParticipants || isFinalizing || tournamentParticipants.data.length < 5
                    }
                  >
                    <DoneIcon />
                  </Fab>
                </Tooltip>
              )}
          </Stack>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            position: 'relative',
          }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {titles.map((title) => (
                  <TableCell
                    align="center"
                    key={title}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={500}
                    >
                      {title}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tournamentParticipants && tournamentParticipants.data.length > 0 ? (
                tournamentParticipants.data.map((row) => (
                  <TableRow
                    key={row.userId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                        <Avatar
                          src={row.user?.image}
                          alt={row.user?.name}
                          sx={{ width: '50px', height: '50px' }}
                        />
                        <Typography variant="body1">{row.user?.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{row.user?.email}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{MemberRoleOptions[row.user.role]}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">
                        {displayDateTime({ dateTime: row.createdAt, targetFormat: FormatDateTime.DATE_AND_FULL_TIME })}
                      </Typography>
                    </TableCell>

                    {tournamentParticipants.isCreator && !checkFinalizedApplicants(tournamentData.phase) && (
                      <TableCell>
                        <Tooltip
                          title="Remove"
                          onClick={() => handleRemoveParticipant(row.userId, row.user.name)}
                        >
                          <PersonRemoveIcon
                            sx={{
                              cursor: 'pointer',
                              color: '#FF2E63',
                            }}
                          />
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography>No participants yet.</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {(isRemoveLoading || (fetchingParticipants && isFetched) || isFinalizing) && <OverlayCenterLoading />}
        </TableContainer>
      </Box>

      {groupData.isCreator && checkFinalizedApplicants(tournamentData.phase) && (
        <Box my={5}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginY: 2,
              height: '60px',
            }}
          >
            <Typography variant="h4">Referees</Typography>

            <Stack
              direction="row"
              alignItems="center"
              gap={1}
            >
              {groupData.isCreator && tournamentData.phase === GroupTournamentPhase.FINALIZED_APPLICANTS && (
                <Tooltip title="Add referee">
                  <Fab
                    size="medium"
                    color="primary"
                    onClick={handleAddReferee}
                    disabled={isRemoveRefereeLoading || fetchingReferees || isFinalizing}
                  >
                    <PersonAddIcon />
                  </Fab>
                </Tooltip>
              )}
            </Stack>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              position: 'relative',
            }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {refereeTableTitles.map((title) => (
                    <TableCell
                      align="center"
                      key={title}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={500}
                      >
                        {title}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tournamentReferees && tournamentReferees.data.length > 0 ? (
                  tournamentReferees.data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                          <Avatar
                            src={row.image}
                            alt={row.name}
                            sx={{ width: '50px', height: '50px' }}
                          />
                          <Typography variant="body1">{row.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">{row.email}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">{row.phoneNumber}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">{GenderOptions[row.gender]}</Typography>
                      </TableCell>

                      {groupData.isCreator && tournamentData.phase === GroupTournamentPhase.FINALIZED_APPLICANTS && (
                        <TableCell>
                          <Tooltip
                            title="Remove"
                            onClick={() => handleRemoveReferee(row.id, row.name)}
                          >
                            <PersonRemoveIcon
                              sx={{
                                cursor: 'pointer',
                                color: '#FF2E63',
                              }}
                            />
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography>No referees yet.</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {(isRemoveRefereeLoading || fetchingReferees || isFinalizing) && <OverlayCenterLoading />}
          </TableContainer>
        </Box>
      )}
    </>
  );
}
