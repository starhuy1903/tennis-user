import {
  Alert,
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
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

import { TournamentFormat } from 'constants/tournament';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { checkGeneratedFixtureTournament } from 'utils/tournament';

import data from './data.json';

const titles = ['Participants', 'TM', 'PL', 'WO', 'LO', 'MP'] as const;

const titleStringMapping = {
  Participants: 'Participants',
  TM: 'Total Matches',
  PL: 'Played',
  WO: 'Won',
  LO: 'Lost',
  MP: 'Match Points',
};

export default function Standing() {
  const tournamentData = useAppSelector(selectTournamentData);

  if (!checkGeneratedFixtureTournament(tournamentData.phase)) {
    return (
      <Box mt={4}>
        <Alert severity="info">
          You need to finish the generating fixtures first in the{' '}
          <Link to={`/tournaments/${tournamentData.id}/fixtures`}>Fixtures</Link> tab.
        </Alert>
      </Box>
    );
  }

  if (tournamentData.format === TournamentFormat.ROUND_ROBIN) {
    return (
      <Box mt={2}>
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
              {data.map((participant) => (
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

  return (
    <Box>
      <h1>Standing</h1>
    </Box>
  );
}
