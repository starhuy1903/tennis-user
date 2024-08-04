import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { SortBy } from 'constants/app';
import { FormatDateTime } from 'constants/datetime';
import { ServiceLevel, ServiceLevelOptions, ServiceType, ServiceTypeOptions } from 'constants/service';
import { useGetServicesAdminQuery } from 'store/api/admin/serviceApiSlice';
import { Service } from 'types/package';
import { displayDateTime } from 'utils/datetime';

const titles = ['ID', 'Name', 'Type', 'Level', 'Created At', 'Updated At'];

export default function Services() {
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(10);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DESC);
  const [type, setType] = useState<ServiceType | 'All'>('All');
  const [level, setLevel] = useState<ServiceLevel | 'All'>('All');

  const { data, isLoading, refetch } = useGetServicesAdminQuery(
    {
      page,
      take,
      order: sortBy,
      type: type === 'All' ? undefined : type,
      level: level === 'All' ? undefined : level,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Typography variant="h4">Services</Typography>

        <Stack
          direction="row"
          gap={2}
        >
          <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              labelId="type"
              id="type"
              value={type}
              onChange={(e) => {
                setType(e.target.value as ServiceType);
                setPage(1);
              }}
              label="Type"
              size="small"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value={ServiceType.TOURNAMENT}>Tournament</MenuItem>
              <MenuItem value={ServiceType.GROUP}>Group</MenuItem>
              <MenuItem value={ServiceType.ADVERTISEMENT}>Affiliate</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
            <InputLabel id="level">Level</InputLabel>
            <Select
              labelId="level"
              id="level"
              value={level}
              onChange={(e) => {
                setLevel(e.target.value as ServiceLevel);
                setPage(1);
              }}
              label="Type"
              size="small"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value={ServiceLevel.BASIC}>Basic</MenuItem>
              <MenuItem value={ServiceLevel.ADVANCED}>Advanced</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
            <InputLabel id="sort-by">Sort by</InputLabel>
            <Select
              labelId="sort-by"
              id="sort-by"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortBy);
                setPage(1);
              }}
              label="Sort by"
              size="small"
            >
              <MenuItem value={SortBy.DESC}>Descending</MenuItem>
              <MenuItem value={SortBy.ASC}>Ascending</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
            <InputLabel id="take-items">Show</InputLabel>
            <Select
              labelId="take-items"
              id="take-items"
              value={take}
              onChange={(e) => {
                setTake(e.target.value as number);
                setPage(1);
              }}
              label="Show"
              size="small"
            >
              <MenuItem value={5}>5 items</MenuItem>
              <MenuItem value={10}>10 items</MenuItem>
              <MenuItem value={15}>15 items</MenuItem>
              <MenuItem value={20}>20 items</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, backgroundColor: 'white' }}
          aria-label="services table"
        >
          <TableHead>
            <TableRow>
              {titles.map((title) => (
                <TableCell
                  align="left"
                  key={title}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.data.length > 0 ? (
              data.data.map((item: Service) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Link to={`/services/${item.id}`}>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                      >
                        {item.id}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{ServiceTypeOptions[item.type]}</TableCell>
                  <TableCell>{ServiceLevelOptions[item.level]}</TableCell>
                  <TableCell>
                    {displayDateTime({
                      dateTime: item.createdAt,
                      targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
                    })}
                  </TableCell>
                  <TableCell>
                    {displayDateTime({
                      dateTime: item.createdAt,
                      targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={9}
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={data?.totalPages || 1}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      />
    </Box>
  );
}
