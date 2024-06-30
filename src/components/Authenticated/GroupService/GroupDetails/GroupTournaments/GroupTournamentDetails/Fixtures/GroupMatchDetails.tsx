import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import MatchDetails from 'components/Common/Match/MatchDetails';
import { useLazyGetGroupMatchDetailsQuery } from 'store/api/group/group-tournaments/creator/match';
import { selectGroup } from 'store/slice/groupSlice';
import { selectGroupTournamentData, showGroupTournamentBackground } from 'store/slice/groupTournamentSlice';

export default function GroupMatchDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const groupData = useAppSelector(selectGroup);
  const tournamentData = useAppSelector(selectGroupTournamentData);

  const { matchId } = useParams();

  const [getMatchDetailsRequest, { isLoading, data: match }] = useLazyGetGroupMatchDetailsQuery();

  useEffect(() => {
    (async () => {
      if (matchId) {
        try {
          await getMatchDetailsRequest(matchId).unwrap();
          dispatch(showGroupTournamentBackground(false));
        } catch (err) {
          // handled error
          navigate(`/groups/${groupData.id}/tournaments/${tournamentData.id}/fixtures`);
        }
      } else {
        navigate(`/groups/${groupData.id}/tournaments/${tournamentData.id}/fixtures`);
      }
    })();
  }, [getMatchDetailsRequest, matchId, navigate, tournamentData, dispatch, groupData.id]);

  if (isLoading || !match) return <CenterLoading />;

  return (
    <Box mt={4}>
      <MatchDetails match={match} />
    </Box>
  );
}
