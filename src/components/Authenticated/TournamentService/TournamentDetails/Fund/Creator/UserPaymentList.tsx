import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { useAppSelector } from 'store';

import { useGetUserPaymentDataQuery, useUpdateUserPaymentDataMutation } from 'store/api/tournament/creator/fund';
import { selectTournamentData } from 'store/slice/tournamentSlice';

const titles = ['Participants', 'Status', 'Message', 'Action'] as const;

export default function UserPaymentList() {
  const tournamentData = useAppSelector(selectTournamentData);

  const { data, refetch, isLoading } = useGetUserPaymentDataQuery(
    { tournamentId: tournamentData.id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateUserPaymentRequest, { isLoading: isUpdating }] = useUpdateUserPaymentDataMutation();

  const handleCheck = useCallback(
    async (userId: string) => {
      try {
        await updateUserPaymentRequest({
          tournamentId: tournamentData.id,
          body: { userId, status: 'succeed' },
        }).unwrap();
        await refetch();
      } catch (error) {
        // handled error
      }
    },
    [refetch, tournamentData.id, updateUserPaymentRequest]
  );

  const handleFail = useCallback((userId: string) => {}, []);

  return (
    <Box mt={2}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="locations"
        >
          <TableHead>
            <TableRow>
              {titles.map((title) => (
                <TableCell
                  align="center"
                  key={title}
                >
                  <Typography>{title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array(3)
                .fill(null)
                .map(() => (
                  <TableRow>
                    <TableCell colSpan={titles.length}>
                      <Skeleton
                        variant="rectangular"
                        height={30}
                      />
                    </TableCell>
                  </TableRow>
                ))
            ) : data && data.data.length > 0 ? (
              data?.data.map((row) => (
                <TableRow
                  key={row.userId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">{row.message}</TableCell>
                  <TableCell align="center">
                    {row.status === 'pending' && (
                      <>
                        <IconButton
                          color="success"
                          aria-label="check"
                          onClick={() => handleCheck(row.userId)}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          color="warning"
                          aria-label="fail"
                          onClick={() => handleFail(row.userId)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Box>No data</Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
