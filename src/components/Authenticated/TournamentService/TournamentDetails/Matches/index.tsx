import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import SensorsIcon from '@mui/icons-material/Sensors';
import { Alert, Box, Button, Stack, Tab, Tabs, Tooltip, Typography, tabsClasses } from '@mui/material';
import { grey, lightGreen, red } from '@mui/material/colors';
import dayjs from 'dayjs';
import { groupBy } from 'lodash-es';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoIosTennisball } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { FormatDateTime } from 'constants/datetime';
import { MatchState } from 'constants/match';
import { ParticipantType, TournamentPhase } from 'constants/tournament';
import { useEndTournamentMutation } from 'store/api/tournament/creator/general';
import { useLazyGetMatchesQuery } from 'store/api/tournament/shared/match';
import { checkTournamentRole, selectTournamentData, setTournamentDetails } from 'store/slice/tournamentSlice';
import { Match } from 'types/tournament-fixtures';
import { displayDateRange, displayDateTime } from 'utils/datetime';
import { checkGeneratedFixture } from 'utils/tournament';

import TennisCourtIcon from 'assets/icons/tennis-court.svg';

import { MatchItem } from '../../Common/MatchItem';
import { WrapperContainer } from '../Common/StyledComponent';
import LiveMatch from './LiveMatch';
import RecentMatch from './RecentMatch';

const compareDate = (dateA: string, dateB: string) => {
  if (dayjs(dateA).isBefore(dayjs(dateB))) {
    return -1; // a comes first
  }
  if (dayjs(dateB).isBefore(dayjs(dateA))) {
    return 1; // b comes first
  }
  return 0; // a and b are equal
};

const NoMatchFound = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      mt={2}
    >
      <img
        src={TennisCourtIcon}
        alt=""
        style={{ height: 70 }}
      />
      <Typography
        mt={1}
        color={grey[600]}
        fontSize={14}
      >
        No matches found
      </Typography>
    </Stack>
  );
};

export default function Matches() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);
  const [getMatchesReq, { isLoading, data: matchData }] = useLazyGetMatchesQuery();

  const isSinglePlayer = tournamentData.participantType === ParticipantType.SINGLE;

  const [hasValidFilterDate, setHasValidFilterDate] = useState(false);

  const isAllMatchesScored = useMemo(
    () => matchData?.matches.every((match) => match.status === MatchState.SCORE_DONE),
    [matchData]
  );

  const liveMatches = useMemo(() => {
    return matchData ? matchData.matches.filter((match) => match.status === MatchState.WALK_OVER) : [];
  }, [matchData]);

  const recentMatches = useMemo(() => {
    return matchData
      ? matchData.matches
          .filter((match) => match.status === MatchState.SCORE_DONE)
          .sort((a, b) => compareDate(a.matchEndDate || '', b.matchEndDate || ''))
          .slice()
          .reverse()
      : [];
  }, [matchData]);

  const groupedMatchesByDate = useMemo(() => {
    if (!matchData) return {};

    return groupBy(matchData.matches, (i) => {
      return i.matchStartDate ? i.matchStartDate.split('T')[0] : '';
    });
  }, [matchData]);

  const renderedDateRange = useMemo(() => {
    return Object.keys(groupedMatchesByDate).sort(compareDate);
  }, [groupedMatchesByDate]);

  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const filterMatches = useMemo(() => {
    const matches = groupedMatchesByDate[selectedDate] || [];
    return matches.sort((a, b) => compareDate(a.matchStartDate || '', b.matchStartDate || ''));
  }, [groupedMatchesByDate, selectedDate]);

  const handleSelectDate = (_: React.SyntheticEvent, filteredDate: string) => {
    setSelectedDate(filteredDate);
  };

  const handleViewMatchDetails = useCallback(
    (match: Match) => {
      if (checkGeneratedFixture(tournamentData.phase)) {
        navigate(`/tournaments/${tournamentData.id}/matches/${match.id}`);
      }
    },
    [navigate, tournamentData.id, tournamentData.phase]
  );

  const [endTournamentRequest, { isLoading: endingTournament }] = useEndTournamentMutation();

  const handleCompleteTournament = useCallback(() => {
    confirm({
      title: `Complete the tournament`,
      description: `Are you sure you want to complete the tournament?`,
    }).then(async () => {
      try {
        const res = await endTournamentRequest(tournamentData.id).unwrap();
        console.log({ res });
        dispatch(setTournamentDetails(res));
      } catch (error) {
        // handled error
      }
    });
  }, [confirm, dispatch, endTournamentRequest, tournamentData.id]);

  useEffect(() => {
    (async () => {
      if (checkGeneratedFixture(tournamentData.phase)) {
        try {
          await getMatchesReq(tournamentData.id).unwrap();
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getMatchesReq, tournamentData.id, tournamentData.phase]);

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    if (!renderedDateRange.includes(today)) {
      setSelectedDate(renderedDateRange[renderedDateRange.length - 1]);
    }
    setHasValidFilterDate(true);
  }, [renderedDateRange]);

  const renderMatchList = () => {
    if (filterMatches.length === 0) {
      return <NoMatchFound />;
    }

    return filterMatches.map((match) => {
      return (
        <Box
          key={match.id}
          width="100%"
          display="flex"
        >
          <MatchItem
            match={match}
            onViewDetails={handleViewMatchDetails}
            isGeneratedFixture
            type="matches"
            wrapperSx={{ maxWidth: 600 }}
          />
        </Box>
      );
    });
  };

  if (!checkGeneratedFixture(tournamentData.phase)) {
    return (
      <WrapperContainer>
        {isCreator ? (
          <Alert severity="info">No information available. Please go to the Fixtures tab to generate fixtures.</Alert>
        ) : (
          <Alert severity="info">No information to show!</Alert>
        )}
      </WrapperContainer>
    );
  }

  if (isLoading || !matchData || !hasValidFilterDate || renderedDateRange.length === 0) {
    return (
      <WrapperContainer>
        <CenterLoading />
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer>
      {isAllMatchesScored && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          sx={{ mb: 4 }}
        >
          <Alert severity="success">
            All the matches has been scored. You can go to the Standings tab to see the results.
          </Alert>
          {isCreator && tournamentData.phase !== TournamentPhase.COMPLETED && (
            <Button
              variant="contained"
              onClick={handleCompleteTournament}
              disabled={endingTournament}
            >
              Complete the tournament
            </Button>
          )}
        </Box>
      )}
      <Box
        display="flex"
        gap={4}
      >
        <Stack flex={2}>
          <Stack width="100%">
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              pl={2}
            >
              <Box
                display="flex"
                alignItems="center"
                gap={0.5}
              >
                <CalendarTodayIcon sx={{ color: red[400], fontSize: 22 }} />
                <Typography
                  color={grey[800]}
                  fontSize={14}
                >
                  {displayDateRange(renderedDateRange[0], renderedDateRange[renderedDateRange.length - 1])}
                </Typography>
              </Box>
              <Tooltip title="Total match">
                <Box
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                >
                  <IoIosTennisball
                    fontSize={22}
                    color={lightGreen['600']}
                  />
                  <Typography
                    color={grey[800]}
                    fontSize={14}
                  >
                    {matchData.matches.length} matches
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Box
              mt={2}
              sx={{
                flexGrow: 1,
                maxWidth: { xs: 320, sm: 500, md: 600 },

                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Tabs
                value={selectedDate}
                onChange={handleSelectDate}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    '&.Mui-disabled': { opacity: 0.3 },
                  },
                }}
              >
                {renderedDateRange.map((date) => {
                  const isToday = dayjs(date).isSame(dayjs(), 'day');
                  const label = isToday
                    ? 'Today'
                    : displayDateTime({ dateTime: date, targetFormat: FormatDateTime.DATE_MONTH });
                  return (
                    <Tab
                      key={date}
                      label={label}
                      value={date}
                    />
                  );
                })}
              </Tabs>
            </Box>
          </Stack>

          <Stack
            my={2}
            alignItems="center"
            gap={2}
            width={'100%'}
          >
            {renderMatchList()}
          </Stack>
        </Stack>
        <Stack
          flex={1}
          mt={2}
          gap={2}
        >
          <Stack gap={2}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              color={red[500]}
            >
              <SensorsIcon />
              <Typography
                variant="h2"
                fontWeight={700}
              >
                Live matches
              </Typography>
            </Box>
            <Stack gap={1}>
              {liveMatches.length > 0 ? (
                liveMatches?.map((match) => {
                  return (
                    <LiveMatch
                      key={match.id}
                      match={match}
                      onClick={() => handleViewMatchDetails(match)}
                    />
                  );
                })
              ) : (
                <NoMatchFound />
              )}
            </Stack>
          </Stack>
          <Stack gap={2}>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              color={grey[700]}
            >
              <HistoryIcon />
              <Typography
                variant="h2"
                fontWeight={700}
              >
                Recent matches
              </Typography>
            </Box>

            <Stack gap={1}>
              {recentMatches.length > 0 ? (
                recentMatches.slice(0, 3).map((match) => {
                  return (
                    <RecentMatch
                      key={match.id}
                      match={match}
                      isSinglePlayer={isSinglePlayer}
                      onClick={() => handleViewMatchDetails(match)}
                    />
                  );
                })
              ) : (
                <NoMatchFound />
              )}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </WrapperContainer>
  );
}
