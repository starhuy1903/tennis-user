import {
  Avatar,
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
import { UserRoleOptions } from 'constants/user';
import { useGetUsersAdminQuery } from 'store/api/admin/userApiSlice';
import { UserProfile } from 'types/user';

const titles = ['ID', 'Name', 'Email', 'Role'];

export default function Users() {
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(10);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DESC);

  const { data, isLoading, refetch } = useGetUsersAdminQuery(
    {
      page,
      take,
      order: sortBy,
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
        <Typography variant="h4">Orders</Typography>

        <Stack
          direction="row"
          gap={2}
        >
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
          aria-label="orders table"
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
              data.data.map((item: UserProfile) => (
                <TableRow key={item.id}>
                  <TableCell width="30%">
                    <Link to={`/users/${item.id}`}>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                      >
                        {item.id}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={2}
                    >
                      <Avatar
                        alt={item.name}
                        src={item?.image}
                        sx={{ width: 30, height: 30 }}
                      />
                      {item.name}
                    </Stack>
                  </TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{UserRoleOptions[item.role]}</TableCell>
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
