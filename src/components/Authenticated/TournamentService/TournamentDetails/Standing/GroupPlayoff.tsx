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

import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { ParticipantType, TournamentPhase } from 'constants/tournament';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { GroupPlayoffStanding } from 'types/tournament/standing';

import { DoubleParticipantInfo, SingleParticipantInfo } from '../../Common/ParticipantInfo';
import WinnerTeam from './WinnerTeam';

type Props = {
  standingData: GroupPlayoffStanding;
};

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

export default function GroupPlayoffStandingUI({ standingData }: Props) {
  const tournamentData = useAppSelector(selectTournamentData);
  const numberOfRounds = standingData.standings.knockoutStage.rounds.length;
  const finalMatch = standingData.standings.knockoutStage.rounds[numberOfRounds - 1].matches[0];
  const teamWinner = finalMatch.teamWinnerId === finalMatch.teamId1 ? finalMatch.teams.team1 : finalMatch.teams.team2;

  const isSingleType = tournamentData.participantType === ParticipantType.SINGLE;

  return (
    <Box mt={4}>
      {tournamentData.phase === TournamentPhase.COMPLETED && (
        <WinnerTeam
          name1={teamWinner.user1.name}
          image1={teamWinner.user1.image}
          name2={teamWinner.user2?.name}
          image2={teamWinner.user2?.image}
        />
      )}
      {/* Group stage */}
      {standingData.standings.groupStage.map((groupData) => {
        return (
          <TableContainer
            component={Paper}
            key={groupData.id}
            sx={{ mb: 4, borderRadius: 4, bgcolor: 'white' }}
            elevation={3}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="locations"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={titleObjects.length}
                    align="center"
                    sx={{ backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' }}
                  >
                    <Typography variant="h5">{groupData.title}</Typography>
                  </TableCell>
                </TableRow>
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
                {groupData.teams.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell align="center">{participant.score.rank}</TableCell>
                    <TableCell align="left">
                      {isSingleType ? (
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
        );
      })}

      {/* Knockout stage */}
      {standingData.standings.knockoutStage && (
        <KnockoutFixtures
          rounds={standingData.standings.knockoutStage.rounds}
          isStandingTabs
        />
      )}
    </Box>
  );
}
