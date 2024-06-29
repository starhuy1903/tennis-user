import { Alert, Box } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetStandingsQuery } from 'store/api/tournament/shared/standing';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { isGroupPlayoffStanding, isKnockoutStanding, isRoundRobinStanding } from 'types/tournament/standing';
import { checkGeneratedFixtureTournament } from 'utils/tournament';

import GroupPlayoffStandingUI from './GroupPlayoff';
import KnockoutStandingBracket from './Knockout';
import RoundRobinStandingTable from './RoundRobin';

export default function Standing() {
  const tournamentData = useAppSelector(selectTournamentData);

  const [getStandingRequest, { isLoading, data: standingData }] = useLazyGetStandingsQuery();

  useEffect(() => {
    (async () => {
      try {
        await getStandingRequest(tournamentData.id).unwrap();
      } catch (error) {
        // handled error
      }
    })();
  }, [getStandingRequest, tournamentData.id]);

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

  if (isLoading) {
    return (
      <Box mt={4}>
        <CenterLoading />
      </Box>
    );
  }

  if (!standingData) {
    return (
      <Box mt={4}>
        <Alert severity="info">No standing data available.</Alert>
      </Box>
    );
  }

  if (isRoundRobinStanding(standingData)) {
    return <RoundRobinStandingTable standingData={standingData} />;
  } else if (isKnockoutStanding(standingData)) {
    return <KnockoutStandingBracket standingData={standingData} />;
  } else if (isGroupPlayoffStanding(standingData)) {
    return <GroupPlayoffStandingUI standingData={standingData} />;
  }

  return null;
}
