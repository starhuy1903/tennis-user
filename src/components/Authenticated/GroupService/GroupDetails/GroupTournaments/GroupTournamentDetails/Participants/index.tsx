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
import { useConfirm } from 'material-ui-confirm';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'store';

import { MemberRoleOptions } from 'constants/group';
import { ModalKey } from 'constants/modal';
import {
  useGetGroupTournamentParticipantsQuery,
  useRemoveParticipantMutation,
} from 'store/api/group/groupTournamentApiSlice';
import { showModal } from 'store/slice/modalSlice';
import { formatDateTime } from 'utils/datetime';
import { showSuccess } from 'utils/toast';

const titles = ['Name', 'Email address', 'Role', 'Joined at', ''];

export default function Participants() {
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  const { groupId, tournamentId } = useParams();

  const { data, isLoading } = useGetGroupTournamentParticipantsQuery({
    page: 1,
    take: 10,
    groupId: parseInt(groupId!),
    tournamentId: parseInt(tournamentId!),
  });

  const [removeParticipant, { isLoading: isRemoveLoading }] = useRemoveParticipantMutation();

  const handleAddParticipant = () => {
    dispatch(
      showModal(ModalKey.ADD_PARTICIPANTS, { groupId: parseInt(groupId!), tournamentId: parseInt(tournamentId!) })
    );
  };

  const handleRemoveParticipant = (userId: number, name: string) => {
    confirm({ description: `This action will remove ${name} from this tournament.` })
      .then(() => {
        removeParticipant({ groupId: parseInt(groupId!), tournamentId: parseInt(tournamentId!), userId });
        showSuccess(`Removed ${name} from the tournament successfully.`);
      })
      .catch(() => {});
  };

  if (isLoading) return <CircularProgress />;

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
                  <TableCell align="center">
                    <Typography variant="body1">{row.user?.email}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{MemberRoleOptions[row.user.role]}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{formatDateTime(row.createdAt)}</Typography>
                  </TableCell>

                  {data?.isCreator && !isRemoveLoading ? (
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
                  ) : (
                    <TableCell>
                      <PersonRemoveIcon
                        sx={{
                          color: 'gray',
                        }}
                      />
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
