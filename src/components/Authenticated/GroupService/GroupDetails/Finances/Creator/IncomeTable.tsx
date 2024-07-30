import {
  Box,
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

export default function IncomeTable() {
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
            {/* {expenseData &&
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
              
                  </TableCell>
                </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        component="div"
        count={expenseData?.totalCount || 0}
        rowsPerPage={10}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
      /> */}
    </Paper>
  );
}
