import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import MatchDetails from 'components/Common/Match/MatchDetails';
import { useLazyGetMatchDetailsQuery } from 'store/api/tournament/shared/fixture';
import { selectTournamentData } from 'store/slice/tournamentSlice';
import { Match } from 'types/tournament-fixtures';
import { showError } from 'utils/toast';

export default function OpenMatchDetails() {
  const navigate = useNavigate();
  const tournamentData = useAppSelector(selectTournamentData);

  const { matchId } = useParams();
  const [match, setMatch] = useState<Match | null>(null);

  const [getMatchDetailsRequest, { isLoading }] = useLazyGetMatchDetailsQuery();

  useEffect(() => {
    (async () => {
      if (matchId) {
        try {
          const res = await getMatchDetailsRequest({
            tournamentId: tournamentData.id,
            matchId: Number(matchId),
          }).unwrap();

          setMatch(res);
        } catch (err) {
          // handled error
          navigate(`/tournaments/${tournamentData?.id}/fixtures`);
        }
      } else {
        navigate(`/tournaments/${tournamentData?.id}/fixtures`);
        showError('Match not found');
      }
    })();
  }, [getMatchDetailsRequest, matchId, navigate, tournamentData]);

  if (isLoading || !match) return <CenterLoading />;

  return <MatchDetails match={match} />;
}
