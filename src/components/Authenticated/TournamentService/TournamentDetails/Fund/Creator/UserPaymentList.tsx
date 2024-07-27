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

import {
  DoubleParticipantInfo,
  SingleParticipantInfo,
} from 'components/Authenticated/TournamentService/Common/ParticipantInfo';
import { ParticipantType } from 'constants/tournament';
import { useGetTeamPaymentDataQuery, useUpdateTeamPaymentDataMutation } from 'store/api/tournament/creator/fund';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { UserPaymentStatus } from 'types/tournament/fund';

const titleData = [
  {
    label: 'Participants',
    align: 'left',
  },
  {
    label: 'Status',
    align: 'center',
  },
  {
    label: 'Message',
    align: 'center',
  },
  {
    label: 'Action',
    align: 'center',
  },
] as const;

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

  const { data, refetch, isLoading } = useGetTeamPaymentDataQuery(
    { tournamentId: tournamentData.id },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateTeamPaymentRequest, { isLoading: isUpdating }] = useUpdateTeamPaymentDataMutation();

  const handleCheck = useCallback(
    async (teamId: string) => {
      try {
        await updateTeamPaymentRequest({
          tournamentId: tournamentData.id,
          body: { teamId, status: UserPaymentStatus.SUCCEED },
        }).unwrap();
        await refetch();
      } catch (error) {
        // handled error
      }
    },
    [refetch, tournamentData.id, updateTeamPaymentRequest]
  );

  const handleFail = useCallback(
    (teamId: string) => {
      confirm({ title: 'Confirm failed payment?' }).then(async () => {
        try {
          await updateTeamPaymentRequest({
            tournamentId: tournamentData.id,
            body: { teamId, status: UserPaymentStatus.FAILED },
          }).unwrap();
          await refetch();
        } catch (error) {
          // handled error
        }
      });
    },
    [confirm, refetch, tournamentData.id, updateTeamPaymentRequest]
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
              {titleData.map((title) => (
                <TableCell
                  align={title.align}
                  key={title.label}
                >
                  <Typography>{title.label}</Typography>
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
                    <TableCell colSpan={titleData.length}>
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
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    {tournamentData.participantType === ParticipantType.SINGLE ? (
                      <SingleParticipantInfo
                        image={row.team.user1.image}
                        name={row.team.user1.name}
                      />
                    ) : (
                      <DoubleParticipantInfo
                        name1={row.team.user1.name}
                        image1={row.team.user1.image}
                        name2={row.team.user2?.name}
                        image2={row.team.user2?.image}
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">{PaymentStatus[row.status]}</TableCell>
                  <TableCell align="center">{row.message}</TableCell>
                  <TableCell align="center">
                    {row.status === 'pending' && (
                      <>
                        <IconButton
                          color="success"
                          aria-label="check"
                          onClick={() => handleCheck(row.team.id)}
                          disabled={isUpdating || isLoading}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          color="warning"
                          aria-label="fail"
                          onClick={() => handleFail(row.team.id)}
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
