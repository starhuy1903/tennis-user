import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetStandingsQuery } from 'store/api/tournament/shared/standing';
import { checkTournamentRole, selectTournamentData } from 'store/slice/tournamentSlice';
import { isGroupPlayoffStanding, isKnockoutStanding, isRoundRobinStanding } from 'types/tournament/standing';
import { checkGeneratedFixtureTournament } from 'utils/tournament';

import { WrapperContainer } from '../Common/StyledComponent';
import GroupPlayoffStandingUI from './GroupPlayoff';
import KnockoutStandingBracket from './Knockout';
import RoundRobinStandingTable from './RoundRobin';

export default function Standing() {
  const tournamentData = useAppSelector(selectTournamentData);
  const { isCreator } = useAppSelector(checkTournamentRole);

  const [getStandingRequest, { isLoading, data: standingData }] = useLazyGetStandingsQuery();

  useEffect(() => {
    (async () => {
      if (checkGeneratedFixtureTournament(tournamentData.phase)) {
        try {
          await getStandingRequest(tournamentData.id).unwrap();
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getStandingRequest, tournamentData.id, tournamentData.phase]);

  if (!checkGeneratedFixtureTournament(tournamentData.phase)) {
    if (isCreator) {
      return (
        <WrapperContainer>
          <Alert severity="info">
            You need to finish the generating fixtures first in the{' '}
            <Link to={`/tournaments/${tournamentData.id}/fixtures`}>Fixtures</Link> tab.
          </Alert>
        </WrapperContainer>
      );
    } else {
      return (
        <WrapperContainer>
          <Alert severity="info">No information to show!</Alert>
        </WrapperContainer>
      );
    }
  }

  if (isLoading) {
    return (
      <WrapperContainer>
        <CenterLoading />
      </WrapperContainer>
    );
  }

  if (!standingData) {
    return (
      <WrapperContainer>
        <Alert severity="info">No standing data available.</Alert>
      </WrapperContainer>
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
