import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
  Alert,
  Avatar,
  Box,
  Fab,
  Paper,
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
import {
  useLazyGetGroupTournamentParticipantsQuery,
  useRemoveParticipantMutation,
} from 'store/api/group/groupTournamentApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournament } from 'store/slice/groupTournamentSlice';
import { showModal } from 'store/slice/modalSlice';
import { displayDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

const titles = ['Name', 'Email address', 'Role', 'Joined at', ''];

export default function Participants() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const groupData = useAppSelector(selectGroup);
  const { data: tournamentData } = useAppSelector(selectGroupTournament);

  const { tournamentId } = useParams();

  const [isFetched, setIsFetched] = useState(false);
  const [fetchingParticipants, setFetchingParticipants] = useState(false);
  const [getPaticipants, { data: tournamentParticipant }] = useLazyGetGroupTournamentParticipantsQuery();
  const [removeParticipant, { isLoading: isRemoveLoading }] = useRemoveParticipantMutation();

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
          await removeParticipant({ groupId: groupData.id, tournamentId: parseInt(tournamentId!), userId });
          await handleGetParticipantsData();
          showSuccess(`Removed ${name} from the tournament successfully.`);
        } catch (error) {
          // handle error
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    handleGetParticipantsData();
    setIsFetched(true);
  }, [handleGetParticipantsData]);

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

        {tournamentParticipant && tournamentParticipant.isCreator && (
          <Tooltip title="Add participant">
            <Fab
              size="medium"
              color="primary"
              onClick={handleAddParticipant}
              disabled={isRemoveLoading || fetchingParticipants}
            >
              <PersonAddIcon />
            </Fab>
          </Tooltip>
        )}
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
            {tournamentParticipant && tournamentParticipant.data.length > 0 ? (
              tournamentParticipant.data.map((row) => (
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

                  {tournamentParticipant.isCreator && (
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

        {(isRemoveLoading || (fetchingParticipants && isFetched)) && <OverlayCenterLoading />}
      </TableContainer>
    </Box>
  );
}
