import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { FormatDateTime } from 'constants/datetime';
import { GenderOptions } from 'constants/tournament';
import { useGetOpenTournamentParticipantsQuery } from 'store/api/tournament/shared/participant';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { UserProfile } from 'types/user';
import { displayDateTime } from 'utils/datetime';

const titles = ['Name', 'ELO', 'Email address', 'Phone', 'Gender', 'Applied date'];

const ParticipantName = ({ user }: { user: UserProfile }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '20px' }}>
      <Avatar
        src={user.image}
        alt={user.name}
        sx={{ width: '50px', height: '50px' }}
      />
      <Typography variant="body1">{user.name}</Typography>
    </Box>
  );
};

const Cell = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableCell align="center">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '40px',
        }}
      >
        {children}
      </Box>
    </TableCell>
  );
};

export default function ParticipantList() {
  const tournamentData = useAppSelector(selectTournamentData);

  const { data, isLoading } = useGetOpenTournamentParticipantsQuery({
    page: 1,
    take: 10,
    tournamentId: tournamentData.id,
  });

  if (isLoading) return <CenterLoading height="30vh" />;

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
              data.data.map((row) => (
                <TableRow
                  key={row.user1.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
                      <ParticipantName user={row.user1} />

                      {row?.user2 && <ParticipantName user={row.user2} />}
                    </Box>
                  </TableCell>

                  <Cell>
                    <Box>{row.user1.elo || '--'}</Box>

                    {row.user2 && <Box>{row.user2.elo || '--'}</Box>}
                  </Cell>

                  <Cell>
                    <Box>{row.user1.email}</Box>

                    {row.user2 && <Box>{row.user2.email}</Box>}
                  </Cell>

                  <Cell>
                    <Box>{row.user1.phoneNumber}</Box>

                    {row.user2 && <Box>{row.user2.phoneNumber}</Box>}
                  </Cell>

                  <Cell>
                    <Box>{GenderOptions[row.user1.gender]}</Box>

                    {row.user2 && <Box>{GenderOptions[row.user1.gender]}</Box>}
                  </Cell>

                  <TableCell align="center">
                    {displayDateTime({
                      dateTime: row.appliedDate,
                      targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
