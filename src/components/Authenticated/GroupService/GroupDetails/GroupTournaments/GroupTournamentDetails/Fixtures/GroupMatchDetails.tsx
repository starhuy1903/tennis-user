import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import MatchDetails from 'components/Common/Match/MatchDetails';
import { useGetGroupMatchDetailsQuery } from 'store/api/group/groupTournamentFixtureApiSlice';
import { selectGroup } from 'store/slice/groupSlice';

export default function GroupMatchDetails() {
  const navigate = useNavigate();
  const groupData = useAppSelector(selectGroup);

  const { tournamentId, matchId } = useParams();

  const { data, isLoading } = useGetGroupMatchDetailsQuery({
    groupId: groupData.id,
    tournamentId: parseInt(tournamentId!),
    matchId: parseInt(matchId!),
  });

  useEffect(() => {
    if (!data) {
      navigate(`/groups/${groupData.id}/tournaments/${tournamentId}/fixtures`);
    }
  }, [data, groupData.id, navigate, tournamentId]);

  if (isLoading || !data) return <CenterLoading />;

  return <MatchDetails match={data} />;
}
