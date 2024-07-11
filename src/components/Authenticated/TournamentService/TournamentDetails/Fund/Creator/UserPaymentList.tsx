import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Chip,
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
import { useConfirm } from 'material-ui-confirm';
import { useCallback } from 'react';
import { useAppSelector } from 'store';

import { SingleParticipantInfo } from 'components/Authenticated/TournamentService/Common/ParticipantInfo';
import { useGetUserPaymentDataQuery, useUpdateUserPaymentDataMutation } from 'store/api/tournament/creator/fund';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { UserPaymentStatus } from 'types/tournament/fund';

const titles = ['Participants', 'Status', 'Message', 'Action'] as const;

const PaymentStatus = {
  wait: (
    <Chip
      label="Unpaid"
      color="warning"
    />
  ),
  pending: (
    <Chip
      label="Wait for confirmation"
      color="info"
    />
  ),
  succeed: (
    <Chip
      label="Completed"
      color="success"
    />
  ),
  failed: (
    <Chip
      label="Failed"
      color="error"
    />
  ),
};

export default function UserPaymentList() {
  const confirm = useConfirm();
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
          body: { userId, status: UserPaymentStatus.SUCCEED },
        }).unwrap();
        await refetch();
      } catch (error) {
        // handled error
      }
    },
    [refetch, tournamentData.id, updateUserPaymentRequest]
  );

  const handleFail = useCallback(
    (userId: string) => {
      confirm({ title: 'Confirm failed payment?' }).then(async () => {
        try {
          await updateUserPaymentRequest({
            tournamentId: tournamentData.id,
            body: { userId, status: UserPaymentStatus.FAILED },
          }).unwrap();
          await refetch();
        } catch (error) {
          // handled error
        }
      });
    },
    [confirm, refetch, tournamentData.id, updateUserPaymentRequest]
  );

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
                  <TableCell align="center">
                    <SingleParticipantInfo
                      image={row.image}
                      name={row.name}
                    />
                  </TableCell>
                  <TableCell align="center">{PaymentStatus[row.status]}</TableCell>
                  <TableCell align="center">{row.message}</TableCell>
                  <TableCell align="center">
                    {row.status === 'pending' && (
                      <>
                        <IconButton
                          color="success"
                          aria-label="check"
                          onClick={() => handleCheck(row.userId)}
                          disabled={isUpdating || isLoading}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          color="warning"
                          aria-label="fail"
                          onClick={() => handleFail(row.userId)}
                          disabled={isUpdating || isLoading}
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
