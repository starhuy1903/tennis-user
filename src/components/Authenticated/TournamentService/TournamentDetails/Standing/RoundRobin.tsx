import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppSelector } from 'store';

import { ParticipantType } from 'constants/tournament';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { RoundRobinStanding } from 'types/tournament/standing';

import { DoubleParticipantInfo, SingleParticipantInfo } from '../../Common/ParticipantInfo';

const titles = ['', 'Team', 'Total Matches', 'Played', 'Won', 'Lost', 'Match Points'] as const;

type RoundRobinStandingProps = {
  standingData: RoundRobinStanding;
};

export default function RoundRobinStandingTable({ standingData }: RoundRobinStandingProps) {
  const tournamentData = useAppSelector(selectTournamentData);

  const isSingleType = tournamentData.participantType === ParticipantType.SINGLE;

  return (
    <Box my={4}>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: 'white' }}
      >
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
                  <Typography>{title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {standingData.standings.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell align="center">{participant.score.rank}</TableCell>
                <TableCell align="center">
                  {isSingleType ? (
                    <SingleParticipantInfo
                      containerSx={{ justifyContent: 'center' }}
                      name={participant.user1.name}
                      image={participant.user1.image}
                    />
                  ) : (
                    <DoubleParticipantInfo
                      name1={participant.user1.name}
                      image1={participant.user1.image}
                      name2={participant.user2?.name}
                      image2={participant.user2?.image}
                    />
                  )}
                </TableCell>
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
