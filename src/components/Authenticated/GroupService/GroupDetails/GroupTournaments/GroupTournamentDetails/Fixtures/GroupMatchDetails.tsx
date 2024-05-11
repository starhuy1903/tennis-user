import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import MatchDetails from 'components/Common/Match/MatchDetails';
import { useGetGroupMatchDetailsQuery } from 'store/api/group/groupTournamentFixtureApiSlice';

export default function GroupMatchDetails() {
  const navigate = useNavigate();

  const { groupId, tournamentId, matchId } = useParams();

  const { data, isLoading } = useGetGroupMatchDetailsQuery({
    groupId: parseInt(groupId!),
    tournamentId: parseInt(tournamentId!),
    matchId: parseInt(matchId!),
  });

  if (isLoading) return <CenterLoading />;

  if (!data) {
    navigate(`/groups/${groupId}/tournaments/${tournamentId}/fixtures`);
    return;
  }

  return <MatchDetails match={data} />;
}
