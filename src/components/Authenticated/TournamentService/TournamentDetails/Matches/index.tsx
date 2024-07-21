import { Box, Stack, Tab, Tabs, tabsClasses } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import dayjs from 'dayjs';
import { groupBy } from 'lodash-es';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { FormatDateTime } from 'constants/datetime';
import { useLazyGetMatchesQuery } from 'store/api/tournament/shared/match';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { Match } from 'types/tournament-fixtures';
import { displayDateTime } from 'utils/datetime';
import { checkGeneratedFixture } from 'utils/tournament';

import { MatchItem } from '../../Common/MatchItem';

const compareDate = (dateA: string, dateB: string) => {
  if (dayjs(dateA).isBefore(dayjs(dateB))) {
    return -1; // a comes first
  }
  if (dayjs(dateB).isBefore(dayjs(dateA))) {
    return 1; // b comes first
  }
  return 0; // a and b are equal
};

export default function Matches() {
  const navigate = useNavigate();
  const tournamentData = useAppSelector(selectTournamentData);
  const [getMatchesReq, { isLoading, data: matchData }] = useLazyGetMatchesQuery();

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

  const renderMatchList = () => {
    if (filterMatches.length === 0) {
      return <Box>No matches found</Box>;
    }

    return filterMatches.map((match) => {
      return (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <MatchItem
            match={match}
            onViewDetails={handleViewMatchDetails}
            isGeneratedFixture
            type="matches"
          />
        </Box>
      );
    });
  };

  if (isLoading || !matchData) {
    return <CenterLoading />;
  }

  return (
    <Stack my={2}>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: { xs: 320, sm: 500 },
            bgcolor: deepPurple[100],
            borderRadius: 4,
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
                : displayDateTime({ dateTime: date, targetFormat: FormatDateTime.DATE_2 });
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
      </Box>

      <Stack
        my={2}
        alignItems="center"
        gap={2}
      >
        {renderMatchList()}
      </Stack>
    </Stack>
  );
}
