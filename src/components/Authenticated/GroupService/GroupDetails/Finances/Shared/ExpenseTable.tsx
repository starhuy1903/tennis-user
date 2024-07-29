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
import { useCallback } from 'react';
import { useAppDispatch } from 'store';

import { ModalKey } from 'constants/modal';
import { showModal } from 'store/slice/modalSlice';

export default function ExpenseTable() {
  const dispatch = useAppDispatch();
  const handleChangePage = useCallback(() => {}, []);

  const handleAddExpense = useCallback(() => {
    dispatch(showModal(ModalKey.ADD_EXPENSE, {}));
  }, [dispatch]);

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
                <Button
                  color="info"
                  startIcon={<AddIcon />}
                  onClick={handleAddExpense}
                >
                  Add expenses
                </Button>
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
            <TableRow
              //   key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
              >
                Court
              </TableCell>
              <TableCell align="right">1.500.000 vnd</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">28/07/2024 22:15:22</TableCell>
            </TableRow>
            {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={100}
        rowsPerPage={10}
        page={0}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  );
}
