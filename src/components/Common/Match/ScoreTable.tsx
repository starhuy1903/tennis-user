import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

import { MatchMetaData } from 'types/match';
import { Team } from 'types/tournament-fixtures';

const TeamCell = ({ team }: { team: Team }) => {
  return (
    <TableCell sx={{ display: 'flex', flexDirection: 'column', gap: 2, align: 'center' }}>
      <Typography
        variant="body1"
        align="center"
      >
        {team.user1.name}
      </Typography>
      {team.user2 && (
        <Typography
          variant="body1"
          align="center"
        >
          {team.user2.name}
        </Typography>
      )}
    </TableCell>
  );
};

// const ScoreCell = ({ scores, team }: { scores: Score[]; team: TeamType }) => {
//   return (
//     <>
//       {scores.length !== 0 ? (
//         scores.map((score, scoreIndex) => (
//           <TableCell
//             key={scoreIndex}
//             align="center"
//           >
//             {score[`team${team}`]}
//             {score[`tiebreakTeam${team}`] && (
//               <sup
//                 style={{
//                   fontSize: 10,
//                   marginLeft: 2,
//                 }}
//               >
//                 {score[`tiebreakTeam${team}`]}
//               </sup>
//             )}
//           </TableCell>
//         ))
//       ) : (
//         <TableCell align="center">-</TableCell>
//       )}
//     </>
//   );
// };

export default function ScoreTable({ match }: { match: MatchMetaData }) {
  return (
    <Table sx={{ minWidth: 650, tableLayout: 'fixed' }}>
      <TableBody>
        {/* Team 1 */}
        <TableRow>
          <TableCell
            sx={{
              align: 'center',
              fontWeight: 'bold',
            }}
          >
            Team 1
          </TableCell>
          <TeamCell team={match.team1} />
          {/* <ScoreCell
            scores={match.scores}
            team={1}
          /> */}
          <TableCell
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {match.matchFinalScore.team1}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell
            sx={{
              align: 'center',
              fontWeight: 'bold',
            }}
          >
            Team 2
          </TableCell>

          {/* <TeamCell team={match.team2} /> */}

          {/* <ScoreCell
            scores={match.scores}
            team={2}
          /> */}

          <TableCell
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {match.matchFinalScore.team2}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell
            sx={{
              align: 'center',
              fontWeight: 'bold',
            }}
          >
            Match Time
          </TableCell>
          <TableCell align="center" />

          {/* {match.scores?.length !== 0 ? (
            match.scores?.map((score, scoreIndex) => (
              <TableCell
                key={scoreIndex}
                align="center"
              >
                {displayHour(score.time)}
              </TableCell>
            ))
          ) : (
            <TableCell align="center">-</TableCell>
          )} */}

          <TableCell align="center" />
        </TableRow>
      </TableBody>
    </Table>
  );
}
