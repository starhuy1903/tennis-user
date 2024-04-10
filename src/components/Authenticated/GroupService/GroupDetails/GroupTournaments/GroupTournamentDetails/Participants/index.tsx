import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
  Avatar,
  Box,
  CircularProgress,
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
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';

import { MemberRoleOptions } from 'constants/group';
import { ModalKey } from 'constants/modal';
import { useGetGroupTournamentParticipantsQuery } from 'store/api/group/groupTournamentApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { formatDateTime } from 'utils/datetime';

export default function Participants() {
  const dispatch = useAppDispatch();

  const { groupId, tournamentId } = useParams();

  const { data, isLoading } = useGetGroupTournamentParticipantsQuery({
    page: 1,
    take: 10,
    groupId: parseInt(groupId!),
    tournamentId: parseInt(tournamentId!),
  });

  if (isLoading) return <CircularProgress />;

  const handleAddParticipant = () => {
    dispatch(
      showModal(ModalKey.ADD_PARTICIPANTS, { groupId: parseInt(groupId!), tournamentId: parseInt(tournamentId!) })
    );
  };

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

        {data?.isCreator && (
          <Tooltip title="Add participant">
            <Fab
              size="medium"
              color="primary"
              onClick={handleAddParticipant}
            >
              <PersonAddIcon />
            </Fab>
          </Tooltip>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email address</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Joined at</TableCell>
              {data?.isCreator && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.data.map((row) => (
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
                  <TableCell>{row.user.email}</TableCell>
                  <TableCell align="center">{MemberRoleOptions[row.user.role]}</TableCell>
                  <TableCell align="center">{formatDateTime(row.createdAt)}</TableCell>

                  {data?.isCreator && (
                    <TableCell>
                      <Tooltip title="Remove">
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
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
