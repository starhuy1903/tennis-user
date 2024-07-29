import { Box, Stack } from '@mui/material';

import ExpenseTable from '../Shared/ExpenseTable';
import Statistic from '../Shared/Statistic';

export default function FinanceMember() {
  return (
    <Box>
      <Stack gap={4}>
        <Statistic />
        <ExpenseTable />
      </Stack>
    </Box>
  );
}
