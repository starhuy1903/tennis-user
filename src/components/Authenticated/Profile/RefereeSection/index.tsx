import {
  Box,
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

import CenterLoading from 'components/Common/CenterLoading';
import NoData from 'components/Common/NoData';
import { FormatDateTime } from 'constants/datetime';
import { MatchState } from 'constants/match';
import { useGetRefereeMatchesQuery } from 'store/api/userApiSlice';
import { displayDateTime } from 'utils/datetime';

const titles = ['Match ID', 'Name', 'Status', 'Start time', 'Venue'];

const formatDateTime = (dateTime: string) => {
  return displayDateTime({
    dateTime,
    targetFormat: FormatDateTime.DATE_AND_FULL_TIME,
  });
};

const Badge = ({ color, text }: { color: string; text: string }) => (
  <Typography
    sx={{
      color: 'white',
      fontWeight: 500,
      backgroundColor: color,
      borderRadius: '5px',
      padding: '5px',
    }}
  >
    {text}
  </Typography>
);

const MatchStatusBadge = ({ status }: { status: MatchState }) => {
  switch (status) {
    case MatchState.SCHEDULED:
      return (
        <Badge
          color="#378CE7"
          text="Schedule"
        />
      );
    case MatchState.WALK_OVER:
      return (
        <Badge
          color="#75A47F"
          text="Going on"
        />
      );
    case MatchState.DONE:
      return (
        <Badge
          color="#F7418F"
          text="Finished"
        />
      );
    default:
      return null;
  }
};

export default function RefereeSection() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(MatchState.SCHEDULED);

  const { data, isLoading, refetch } = useGetRefereeMatchesQuery({
    page,
    take: 5,
    status,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          width: '100%',
        }}
      >
        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value as MatchState)}
          sx={{
            mb: 2,
          }}
          size="small"
        >
          <MenuItem value={MatchState.SCHEDULED}>Up Coming</MenuItem>
          <MenuItem value={MatchState.DONE}>Finished</MenuItem>
        </Select>
      </Stack>

      {data && data.data.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="locations"
            >
              <TableHead>
                <TableRow>
                  {titles.map((title) => (
                    <TableCell
                      align="center"
                      key={title}
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((match) => (
                  <TableRow
                    key={match.id}
                    // onClick={() => {
                    //   dispatch(
                    //     showModal(ModalKey.SHOW_ORDER_DETAIL, {
                    //       orderId: order.id,
                    //       onNavigate: () => navigate(`/pricing`),
                    //     })
                    //   );
                    // }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="center">{match.id}</TableCell>
                    <TableCell align="center">
                      {match.team1.user1.name} vs {match.team2.user1.name}
                    </TableCell>
                    <TableCell align="center">
                      <MatchStatusBadge status={match.status} />
                    </TableCell>
                    <TableCell align="center">{formatDateTime(match.matchStartDate)}</TableCell>
                    <TableCell align="center">{match.venue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={data?.totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{
              mt: 2,
            }}
          />
        </>
      ) : (
        <NoData message="You don't have any matches to record." />
      )}
    </Box>
  );
}
