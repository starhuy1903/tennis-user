import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Paper,
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
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';

import { FormatDateTime } from 'constants/datetime';
import { ModalKey } from 'constants/modal';
import { useGetExpensesQuery } from 'store/api/group/financeApiSlice';
import { selectGroup } from 'store/slice/groupSlice';
import { showModal } from 'store/slice/modalSlice';
import { displayDateTime } from 'utils/datetime';

type ExpenseTableProps = {
  fetchGeneralInfo: () => void;
};

export default function ExpenseTable({ fetchGeneralInfo }: ExpenseTableProps) {
  const dispatch = useAppDispatch();
  const groupData = useAppSelector(selectGroup);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: expenseData, refetch: fetchExpenses } = useGetExpensesQuery(
    { groupId: groupData.id, page: currentPage + 1, take: 10 },
    { refetchOnMountOrArgChange: true }
  );
  const handleChangePage = useCallback((_: any, pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleAddExpense = useCallback(() => {
    dispatch(
      showModal(ModalKey.ADD_EXPENSE, {
        groupId: groupData.id,
        onSuccess: () => {
          setCurrentPage(0);
          fetchExpenses();
          fetchGeneralInfo();
        },
      })
    );
  }, [dispatch, fetchExpenses, fetchGeneralInfo, groupData.id]);

  return (
    <Paper
      variant="outlined"
      sx={{ bgcolor: 'white', borderRadius: 4, overflow: 'hidden' }}
    >
      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow sx={{ bgcolor: teal[100] }}>
              <TableCell colSpan={3}>
                <Typography
                  variant="h2"
                  fontWeight={700}
                  fontSize={24}
                  color={grey[800]}
                >
                  Expenses
                </Typography>
              </TableCell>
              <TableCell align="right">
                {groupData.isCreator && (
                  <Button
                    color="info"
                    startIcon={<AddIcon />}
                    onClick={handleAddExpense}
                  >
                    Add expenses
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseData &&
              expenseData.data.length > 0 &&
              expenseData.data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    {row.categories.join(', ')}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">
                    {displayDateTime({ dateTime: row.createdAt, targetFormat: FormatDateTime.DATE_AND_FULL_TIME })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={expenseData?.totalCount || 0}
        rowsPerPage={10}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  );
}
