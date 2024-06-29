import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';

import { RoundRobinStanding } from 'types/tournament/standing';

const titles = ['Participants', 'TM', 'PL', 'WO', 'LO', 'MP'] as const;

const titleStringMapping = {
  Participants: 'Participants',
  TM: 'Total Matches',
  PL: 'Played',
  WO: 'Won',
  LO: 'Lost',
  MP: 'Match Points',
};

type RoundRobinStandingProps = {
  standingData: RoundRobinStanding;
};

export default function RoundRobinStandingTable({ standingData }: RoundRobinStandingProps) {
  return (
    <Box mt={4}>
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
                  <Tooltip title={titleStringMapping[title]}>
                    <Typography>{title}</Typography>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {standingData.standings.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell align="center">{participant.user1.name}</TableCell>
                <TableCell align="center">{participant.score.totalMatches}</TableCell>
                <TableCell align="center">{participant.score.played}</TableCell>
                <TableCell align="center">{participant.score.won}</TableCell>
                <TableCell align="center">{participant.score.lost}</TableCell>
                <TableCell align="center">{participant.score.matchPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
