import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useMemo } from 'react';

import { MatchState } from 'constants/match';
import { MatchMetaData, SetGameStatus } from 'types/match';

import TennisBallIcon from 'assets/images/tennis-ball.jpg';

type TeamSetScore = {
  setId: number;
  hasDone: boolean;
  score: number;
  isWinner: boolean;
  isTieBreak: boolean;
  tieBreakScore?: string;
};

type CurrentGameScore = {
  score: string;
  isTeamServe: boolean;
  isTeamWinner: boolean;
};

const renderTeamRecord = ({
  isLive,
  isTeamWinner,
  isSingleTeam,
  image1,
  image2,
  mainScore,
  setScores,
  currentScoreData,
}: {
  isLive: boolean;
  isTeamWinner: boolean;
  isSingleTeam: boolean;
  image1: string;
  image2?: string;
  mainScore: number;
  setScores: TeamSetScore[];
  currentScoreData: CurrentGameScore;
}) => {
  return (
    <TableRow>
      <TableCell align="center">
        <Box
          display="flex"
          gap={1}
        >
          <Avatar
            sx={{}}
            src={image1}
          />
          {!isSingleTeam && (
            <Avatar
              sx={{}}
              src={image2}
            />
          )}
        </Box>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="body1"
          fontWeight={isTeamWinner ? 700 : 400}
        >
          {mainScore || 0}
        </Typography>
      </TableCell>
      {setScores.map((setScore, index) => (
        <TableCell
          align="center"
          key={setScore.setId}
        >
          <Typography
            variant="body1"
            fontWeight={setScore.hasDone && setScore.isWinner ? 700 : 400}
            color={index === setScores.length - 1 && isLive ? 'primary' : 'initial'}
          >
            {setScore.score}
            {setScore.isTieBreak && (
              <sup
                style={{
                  fontSize: 10,
                  marginLeft: 2,
                }}
              >
                {setScore.tieBreakScore}
              </sup>
            )}
          </Typography>
        </TableCell>
      ))}
      {Array(3 - setScores.length)
        .fill(null)
        .map((_, index) => (
          <TableCell key={index} />
        ))}
      <TableCell align="center">
        {isLive && (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={50}
              height={50}
              bgcolor={currentScoreData.isTeamWinner ? deepPurple[100] : 'initial'}
              borderRadius={4}
            >
              <Typography
                variant="body1"
                fontSize={currentScoreData.score === 'Game' ? 14 : 22}
              >
                {currentScoreData.score}
              </Typography>
            </Box>
            {currentScoreData.isTeamServe && (
              <img
                src={TennisBallIcon}
                alt=""
                style={{ width: 30 }}
              />
            )}
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
};

type ScoreTableProps = {
  match: MatchMetaData;
  isSingleTeam: boolean;
  isLive: boolean;
};

export default function ScoreTable({ match, isSingleTeam, isLive }: ScoreTableProps) {
  const isEndedMatch = match.status === MatchState.SCORE_DONE;
  const setListData = useMemo(
    () => (isEndedMatch ? match.sets.slice().reverse() : match.sets),
    [isEndedMatch, match.sets]
  );
  const currentSet = setListData[setListData.length - 1];
  const currentGame = currentSet?.games[0];
  const currentScore = currentGame?.scores[0];

  console.log({ currentScore });

  const team1SetScores = useMemo<TeamSetScore[]>(() => {
    return setListData.map((set) => {
      return {
        setId: set.id,
        hasDone: set.status === SetGameStatus.ENDED,
        score: set.setFinalScore.team1,
        isWinner: set.teamWinId === match.team1.id,
        isTieBreak: set.isTieBreak,
        tieBreakScore: set.setFinalScore.tieBreak?.team1,
      };
    });
  }, [setListData, match.team1.id]);

  const team2SetScores = useMemo<TeamSetScore[]>(() => {
    return setListData.map((set) => {
      return {
        setId: set.id,
        hasDone: set.status === SetGameStatus.ENDED,
        score: set.setFinalScore.team2,
        isWinner: set.teamWinId === match.team2.id,
        isTieBreak: set.isTieBreak,
        tieBreakScore: set.setFinalScore.tieBreak?.team2,
      };
    });
  }, [setListData, match.team2.id]);

  return (
    <Table sx={{ minWidth: 650, tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align="center">
            <Typography
              variant="body1"
              fontWeight={500}
            >
              Sets
            </Typography>
          </TableCell>
          {[1, 2, 3].map((set, index) => (
            <TableCell
              align="center"
              key={index}
            >
              <Typography
                variant="body1"
                fontWeight={500}
              >
                {set}
              </Typography>
            </TableCell>
          ))}
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {renderTeamRecord({
          isTeamWinner: match.teamWinnerId === match.team1.id,
          isSingleTeam: isSingleTeam,
          image1: match.team1.user1.image,
          image2: match.team1.user2?.image,
          mainScore: match.team1MatchScore,
          setScores: team1SetScores,
          isLive: isLive,
          currentScoreData: {
            isTeamServe: currentScore?.teamServeId === match.team1.id,
            score: currentScore?.team1Score,
            isTeamWinner: currentScore?.teamWinId === match.team1.id,
          },
        })}
        {renderTeamRecord({
          isTeamWinner: match.teamWinnerId === match.team2.id,
          isSingleTeam: isSingleTeam,
          image1: match.team2.user1.image,
          image2: match.team2.user2?.image,
          mainScore: match.team2MatchScore,
          setScores: team2SetScores,
          isLive: isLive,
          currentScoreData: {
            isTeamServe: currentScore?.teamServeId === match.team2.id,
            score: currentScore?.team2Score,
            isTeamWinner: currentScore?.teamWinId === match.team2.id,
          },
        })}
      </TableBody>
    </Table>
  );
}
