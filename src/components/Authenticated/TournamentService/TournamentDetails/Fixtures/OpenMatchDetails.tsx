import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import MatchDetails from 'components/Common/Match/MatchDetails';
import { useLazyGetMatchDetailsQuery } from 'store/api/tournament/creator/match';
import { selectTournamentData, showTournamentBackground } from 'store/slice/tournamentSlice';

export default function OpenMatchDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tournamentData = useAppSelector(selectTournamentData);

  const { matchId } = useParams();

  const [getMatchDetailsRequest, { isLoading, data: match }] = useLazyGetMatchDetailsQuery();

  useEffect(() => {
    (async () => {
      if (matchId) {
        try {
          await getMatchDetailsRequest(matchId).unwrap();
          dispatch(showTournamentBackground(false));
        } catch (err) {
          // handled error
          navigate(`/tournaments/${tournamentData.id}/fixtures`);
        }
      } else {
        navigate(`/tournaments/${tournamentData.id}/fixtures`);
      }
    })();
  }, [getMatchDetailsRequest, matchId, navigate, tournamentData, dispatch]);

  if (isLoading || !match) return <CenterLoading />;

  return (
    <Box mt={4}>
      <MatchDetails match={match} />
    </Box>
  );
}
