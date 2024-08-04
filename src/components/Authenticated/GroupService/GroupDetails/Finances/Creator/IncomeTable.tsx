import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { grey, teal } from '@mui/material/colors';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'store';

import { SingleParticipantInfo } from 'components/Authenticated/TournamentService/Common/ParticipantInfo';
import { WrapperContainer } from 'components/Authenticated/TournamentService/TournamentDetails/Common/StyledComponent';
import CenterLoading from 'components/Common/CenterLoading';
import {
  useConfirmMemberFundRequestMutation,
  useGetFundQuery,
  useLazyGetFundRequestOfMemberQuery,
} from 'store/api/group/financeApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { MemberPaymentStatus } from 'types/expense';

export const PaymentStatus = {
  [MemberPaymentStatus.WAITING]: (
    <Chip
      label="Unpaid"
      color="warning"
    />
  ),
  [MemberPaymentStatus.PENDING]: (
    <Chip
      label="Wait for confirmation"
      color="info"
    />
  ),
  [MemberPaymentStatus.ACCEPTED]: (
    <Chip
      label="Completed"
      color="success"
    />
  ),
  [MemberPaymentStatus.REJECTED]: (
    <Chip
      label="Failed"
      color="error"
    />
  ),
};

type IncomeTableProps = {
  onGoToCreateFundForm: () => void;
};

export default function IncomeTable({ onGoToCreateFundForm }: IncomeTableProps) {
  const confirm = useConfirm();
  const groupData = useAppSelector(selectGroup);
  const { data: fundData, isLoading: fetchingFundData } = useGetFundQuery({ groupId: groupData.id });
  const [getFundRequestOfMemberRequest, { isFetching: fetchingFundRequestOfMember, data: fundRequestOfMemberData }] =
    useLazyGetFundRequestOfMemberQuery();
  const [confirmRequest, { isLoading: isUpdatingMemberPayment }] = useConfirmMemberFundRequestMutation();

  const [currentPage, setCurrentPage] = useState(0);

  const [selectedFundId, setSelectedFundId] = useState<number | null>(null);

  const handleGetFundRequestOfMember = useCallback(
    async (fundId: number, page = 0, take = 10) => {
      try {
        await getFundRequestOfMemberRequest({
          groupId: groupData.id,
          fundId,
          page: page + 1,
          take,
        });
      } catch (error) {
        // handled error
      }
    },
    [getFundRequestOfMemberRequest, groupData.id]
  );

  const handleChangeFund = useCallback(
    (e: SelectChangeEvent<number>) => {
      handleGetFundRequestOfMember(Number(e.target.value));
      setSelectedFundId(Number(e.target.value));
    },
    [handleGetFundRequestOfMember]
  );

  const handleChangePage = useCallback(
    (_: any, pageNumber: number) => {
      if (!selectedFundId) return;
      setCurrentPage(pageNumber);
      handleGetFundRequestOfMember(selectedFundId, pageNumber);
    },
    [handleGetFundRequestOfMember, selectedFundId]
  );

  const handleCheck = useCallback(
    async (userId: string) => {
      if (!selectedFundId) return;
      try {
        await confirmRequest({
          groupId: groupData.id,
          fundId: selectedFundId,
          userId,
          status: MemberPaymentStatus.ACCEPTED,
        }).unwrap();
        await handleGetFundRequestOfMember(selectedFundId, currentPage);
      } catch (error) {
        // handled error
      }
    },
    [confirmRequest, currentPage, groupData.id, handleGetFundRequestOfMember, selectedFundId]
  );

  const handleFail = useCallback(
    async (userId: string) => {
      if (!selectedFundId) return;
      confirm({ title: 'Confirm failed payment?' }).then(async () => {
        try {
          await confirmRequest({
            groupId: groupData.id,
            fundId: selectedFundId,
            userId,
            status: MemberPaymentStatus.REJECTED,
          }).unwrap();
          await handleGetFundRequestOfMember(selectedFundId, currentPage);
        } catch (error) {
          // handled error
        }
      });
    },
    [confirm, confirmRequest, currentPage, groupData.id, handleGetFundRequestOfMember, selectedFundId]
  );

  useEffect(() => {
    (async () => {
      if (fundData && fundData.totalCount && fundData.totalCount > 0) {
        await handleGetFundRequestOfMember(fundData.data[0].id);
        setSelectedFundId(fundData.data[0].id);
      }
    })();
  }, [fundData, getFundRequestOfMemberRequest, handleGetFundRequestOfMember]);

  if (fetchingFundData) {
    return (
      <WrapperContainer>
        <CenterLoading />
      </WrapperContainer>
    );
  }

  return (
    <Stack>
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={2}
      >
        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <FormLabel htmlFor="fund">Fund</FormLabel>
          <Select
            value={selectedFundId || ''}
            id="fund"
            onChange={handleChangeFund}
            size="small"
          >
            {fundData && fundData.data.length > 0 ? (
              fundData.data.map((fund) => (
                <MenuItem
                  key={fund.id}
                  value={fund.id}
                >
                  {fund.title}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No fund available</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={onGoToCreateFundForm}
        >
          Create new fund
        </Button>
      </Box>
      <Paper
        variant="outlined"
        sx={{ bgcolor: 'white', borderRadius: 4, overflow: 'hidden', mt: 2 }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow sx={{ bgcolor: teal[100] }}>
                <TableCell colSpan={4}>
                  <Typography
                    variant="h2"
                    fontWeight={700}
                    fontSize={24}
                    color={grey[800]}
                  >
                    Income
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Message</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchingFundRequestOfMember ? (
                Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={4}>
                        <Skeleton
                          variant="rectangular"
                          height={30}
                        />
                      </TableCell>
                    </TableRow>
                  ))
              ) : fundRequestOfMemberData && fundRequestOfMemberData.data.length > 0 ? (
                fundRequestOfMemberData.data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      <SingleParticipantInfo name={row.name} />
                    </TableCell>
                    <TableCell align="right">{PaymentStatus[row.status]}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                      {row.status === MemberPaymentStatus.PENDING && (
                        <>
                          <IconButton
                            color="success"
                            aria-label="check"
                            onClick={() => handleCheck(row.userId)}
                            disabled={isUpdatingMemberPayment}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton
                            color="warning"
                            aria-label="fail"
                            onClick={() => handleFail(row.userId)}
                            disabled={isUpdatingMemberPayment}
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
        <TablePagination
          component="div"
          count={fundRequestOfMemberData?.totalCount || 0}
          rowsPerPage={10}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10]}
        />
      </Paper>
    </Stack>
  );
}
