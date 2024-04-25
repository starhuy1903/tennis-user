import { useNavigate, useParams } from 'react-router-dom';

import CenterLoading from 'components/Common/CenterLoading';
import MatchDetails from 'components/Common/Match/MatchDetails';
import { useGetMatchDetailsQuery } from 'store/api/tournament/tournamentFixtureApiSlice';

export default function OpenMatchDetails() {
  const navigate = useNavigate();

  const { tournamentId, matchId } = useParams();

  const { data, isLoading } = useGetMatchDetailsQuery({
    tournamentId: parseInt(tournamentId!),
    matchId: parseInt(matchId!),
  });

  if (isLoading) return <CenterLoading />;

  if (!data) {
    navigate(`/tournaments/${tournamentId}/fixtures`);
    return;
  }

  return <MatchDetails match={data} />;
}
