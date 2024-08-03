import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {
  Avatar,
  Box,
  Chip,
  Fab,
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
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import { ListWrapper } from 'components/Common/Layout/AdminLayout/ScreenWrapper';
import { AdvertisementStatus, AdvertisementStatusChip } from 'constants/advertisement';
import { SortBy } from 'constants/app';
import { FormatDateTime } from 'constants/datetime';
import {
  useGetAdvertisementsAdminQuery,
  useUpdateAdvertisementAdminMutation,
} from 'store/api/admin/advertisementApiSlice';
import { Advertisement } from 'types/advertisement';
import { displayDateTime } from 'utils/datetime';

const titles = ['Title', 'Affiliate', 'Status', 'Created At', 'Updated At', 'Actions'];

export default function PendingAds() {
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(5);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DESC);

  const { data, isLoading, refetch } = useGetAdvertisementsAdminQuery(
    {
      page,
      take,
      order: sortBy,
      status: AdvertisementStatus.PENDING,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const [updateAdvertisement, { isLoading: isUpdateLoading }] = useUpdateAdvertisementAdminMutation();

  const handleApprove = useCallback(
    async (id: string) => {
      await updateAdvertisement({ id, status: AdvertisementStatus.APPROVED });
      refetch();
    },
    [updateAdvertisement, refetch]
  );

  const handleReject = useCallback(
    async (id: string) => {
      await updateAdvertisement({ id, status: AdvertisementStatus.REJECTED });
      refetch();
    },
    [updateAdvertisement, refetch]
  );

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <ListWrapper label="Pending Advertisements">
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
            justifyContent: 'flex-end',
            gap: 2,
          }}
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

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, backgroundColor: 'white' }}
            aria-label="packages table"
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
                data.data.map((item: Advertisement) => (
                  <TableRow key={item.id}>
                    <TableCell width="30%">
                      <Link to={`/advertisements/${item.id}`}>
                        <Typography
                          variant="subtitle2"
                          color="primary"
                        >
                          {item.title}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        gap={2}
                      >
                        <Avatar
                          alt={item.user.name}
                          src={item.user.image}
                          sx={{ width: 24, height: 24 }}
                        />
                        {item.user.name}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={AdvertisementStatusChip[item.status].label}
                        color={AdvertisementStatusChip[item.status].color}
                        sx={{
                          color: 'white',
                        }}
                      />
                    </TableCell>
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
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        <Tooltip title="Approve">
                          <Fab
                            color="success"
                            aria-label="approve"
                            size="small"
                            onClick={() => handleApprove(item.id)}
                            disabled={isUpdateLoading}
                          >
                            <DoneIcon />
                          </Fab>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <Fab
                            color="error"
                            aria-label="reject"
                            size="small"
                            onClick={() => handleReject(item.id)}
                            disabled={isUpdateLoading}
                          >
                            <CloseIcon />
                          </Fab>
                        </Tooltip>
                      </Box>
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
    </ListWrapper>
  );
}
