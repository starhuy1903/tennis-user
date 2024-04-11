import {
  Avatar,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import { GenderOptions } from 'constants/tournament';
import { useGetOpenTournamentParticipantsQuery } from 'store/api/tournament/tournamentParticipantsApiSlice';
import { formatDateTime } from 'utils/datetime';

const titles = ['Name', 'Email address', 'Gender', 'Applied date'];

export default function ParticipantList() {
  const { tournamentId } = useParams();

  const { data, isLoading } = useGetOpenTournamentParticipantsQuery({
    page: 1,
    take: 10,
    tournamentId: parseInt(tournamentId!),
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Box my={4}>
      <Typography
        variant="h4"
        mb={2}
      >
        Participants
      </Typography>

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
                  key={row.user1.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                        <Avatar
                          src={row.user1?.image}
                          alt={row.user1?.name}
                          sx={{ width: '50px', height: '50px' }}
                        />
                        <Typography variant="body1">{row.user1?.name}</Typography>
                      </Box>

                      {row?.user2 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
                          <Avatar
                            src={row.user2?.image}
                            alt={row.user2?.name}
                            sx={{ width: '50px', height: '50px' }}
                          />
                          <Typography variant="body1">{row.user2?.name}</Typography>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '40px',
                      }}
                    >
                      <Box>{row.user1.email}</Box>

                      {row.user2 && <Box>{row.user2.email}</Box>}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {' '}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '40px',
                      }}
                    >
                      <Box>{GenderOptions[row.user1.gender]}</Box>

                      {row.user2 && <Box>{GenderOptions[row.user1.gender]}</Box>}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{formatDateTime(row.appliedDate)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
