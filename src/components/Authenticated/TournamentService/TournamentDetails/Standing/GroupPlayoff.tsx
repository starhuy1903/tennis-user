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

import KnockoutFixtures from 'components/Common/Fixtures/KnockoutFixture';
import { GroupPlayoffStanding } from 'types/tournament/standing';

type Props = {
  standingData: GroupPlayoffStanding;
};

const titles = ['Participants', 'TM', 'PL', 'WO', 'LO', 'MP'] as const;

const titleStringMapping = {
  Participants: 'Participants',
  TM: 'Total Matches',
  PL: 'Played',
  WO: 'Won',
  LO: 'Lost',
  MP: 'Match Points',
};

export default function GroupPlayoffStandingUI({ standingData }: Props) {
  return (
    <Box mt={4}>
      {/* Group stage */}
      {standingData.standings.groupStage.map((groupData) => {
        return (
          <TableContainer
            component={Paper}
            key={groupData.id}
            sx={{ mb: 4 }}
          >
            <Table
              sx={{ minWidth: 650 }}
              aria-label="locations"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={titles.length}
                    align="center"
                  >
                    <Typography variant="h5">Group {groupData.title}</Typography>
                  </TableCell>
                </TableRow>
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
                {groupData.teams.map((participant) => (
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
        );
      })}

      {/* Knockout stage */}
      {standingData.standings.knockoutStage && (
        <KnockoutFixtures rounds={standingData.standings.knockoutStage.rounds} />
      )}
    </Box>
  );
}
