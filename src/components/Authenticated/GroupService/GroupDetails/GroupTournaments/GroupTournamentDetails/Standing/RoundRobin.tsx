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

import { SingleParticipantInfo } from 'components/Authenticated/TournamentService/Common/ParticipantInfo';
import WinnerTeam from 'components/Authenticated/TournamentService/TournamentDetails/Standing/WinnerTeam';
import { GroupTournamentPhase } from 'constants/group-tournament';
import { selectGroupTournamentData } from 'store/slice/groupTournamentSlice';
import { RoundRobinStanding } from 'types/tournament/standing';

const titleObjects = [
  {
    title: '',
    align: 'center',
  },
  {
    title: 'Team',
    align: 'left',
  },
  {
    title: 'Total Matches',
    align: 'center',
  },
  {
    title: 'Played',
    align: 'center',
  },
  {
    title: 'Won',
    align: 'center',
  },
  {
    title: 'Lost',
    align: 'center',
  },
  {
    title: 'Match Points',
    align: 'center',
  },
] as const;

type RoundRobinStandingProps = {
  standingData: RoundRobinStanding;
};

export default function RoundRobinStandingTable({ standingData }: RoundRobinStandingProps) {
  const tournamentData = useAppSelector(selectGroupTournamentData);

  const winnerTeam = standingData.standings.find((participant) => participant.score.rank === 1);

  return (
    <Box my={4}>
      {tournamentData.phase === GroupTournamentPhase.COMPLETED && (
        <WinnerTeam
          name1={winnerTeam?.user1.name}
          image1={winnerTeam?.user1.image}
        />
      )}

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
              {titleObjects.map((titleData) => (
                <TableCell
                  align={titleData.align}
                  key={titleData.title}
                >
                  <Typography>{titleData.title}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {standingData.standings.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell align="center">{participant.score.rank}</TableCell>
                <TableCell>
                  <SingleParticipantInfo
                    name={participant.user1.name}
                    image={participant.user1.image}
                  />
                  {/* {isSingleType ? (
                    <SingleParticipantInfo
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
                  )} */}
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
