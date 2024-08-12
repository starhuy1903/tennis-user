import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'store';

import { WrapperContainer } from 'components/Authenticated/TournamentService/TournamentDetails/Common/StyledComponent';
import CenterLoading from 'components/Common/CenterLoading';
import { useLazyGetStandingsQuery } from 'store/api/group/group-tournaments/shared/standing';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournamentData } from 'store/slice/groupTournamentSlice';
import { isKnockoutStanding, isRoundRobinStanding } from 'types/tournament/standing';
import { checkGeneratedFixture } from 'utils/group-tournament';

import KnockoutStandingBracket from './Knockout';
import RoundRobinStandingTable from './RoundRobin';

export default function Standing() {
  const tournamentData = useAppSelector(selectGroupTournamentData);
  const groupData = useAppSelector(selectGroup);

  const [getStandingRequest, { isLoading, data: standingData }] = useLazyGetStandingsQuery();

  useEffect(() => {
    (async () => {
      if (checkGeneratedFixture(tournamentData.phase)) {
        try {
          await getStandingRequest({ groupId: groupData.id, tournamentId: tournamentData.id }).unwrap();
        } catch (error) {
          // handled error
        }
      }
    })();
  }, [getStandingRequest, groupData.id, tournamentData.id, tournamentData.phase]);

  if (!checkGeneratedFixture(tournamentData.phase)) {
    if (groupData.isCreator) {
      return (
        <WrapperContainer>
          <Alert severity="info">
            You need to finish the generating fixtures first in the{' '}
            <Link to={`/groups/${groupData.id}/tournaments/${tournamentData.id}/fixtures`}>Fixtures</Link> tab.
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
  }

  return null;
}
