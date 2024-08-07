import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useCallback } from 'react';

import CenterLoading from 'components/Common/CenterLoading';
import { OrderStatistic } from 'types/admin/order';

type OrderTypeProps = {
  statisticData?: OrderStatistic;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
};

export default function OrderType({ statisticData: data, selectedYear, setSelectedYear }: OrderTypeProps) {
  const handleChangeYear = useCallback(
    (event: SelectChangeEvent<number>) => {
      setSelectedYear(Number(event.target.value));
    },
    [setSelectedYear]
  );

  if (!data) {
    return <CenterLoading />;
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          variant="h4"
          gutterBottom
          fontSize={30}
          fontWeight={500}
        >
          Order
        </Typography>
        <FormControl sx={{ mb: 4, width: 200 }}>
          <InputLabel id="chart-type-label">Year</InputLabel>
          <Select
            labelId="chart-type-label"
            value={selectedYear}
            label="Year"
            onChange={handleChangeYear}
          >
            {[2024].map((year) => (
              <MenuItem
                key={year}
                value={year}
              >
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <LineChart
        width={1000}
        height={600}
        series={data.series.map((item) => ({
          data: item.data,
          label: item.name,
        }))}
        xAxis={[{ scaleType: 'point', data: data.categories }]}
        yAxis={[{ label: 'Orders' }]}
        sx={{
          '& .MuiLineChart-line': {
            stroke: 'url(#gradient)',
          },
        }}
      />
    </Box>
  );
}
