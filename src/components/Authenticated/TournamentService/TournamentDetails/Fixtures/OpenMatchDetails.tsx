import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';

import CenterLoading from 'components/Common/CenterLoading';
import MatchDetails from 'components/Common/Match/MatchDetails';
import { MatchState } from 'constants/match';
import { useLazyGetMatchDetailsQuery } from 'store/api/tournament/shared/match';
import { selectTournamentData, showTournamentBackground } from 'store/slice/tournamentSlice';

export default function OpenMatchDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tournamentData = useAppSelector(selectTournamentData);

  const { matchId } = useParams();

  const [pollingTime, setPollingTime] = useState<number | undefined>(10000);

  const [getMatchDetailsRequest, { isLoading, data: match }] = useLazyGetMatchDetailsQuery({
    pollingInterval: pollingTime,
  });

  useEffect(() => {
    (async () => {
      if (matchId) {
        try {
          await getMatchDetailsRequest(matchId).unwrap();
          dispatch(showTournamentBackground(false));
        } catch (err) {
          // handled error
          navigate(`/tournaments/${tournamentData.id}/matches`);
        }
      } else {
        navigate(`/tournaments/${tournamentData.id}/matches`);
      }
    })();
  }, [getMatchDetailsRequest, matchId, navigate, tournamentData, dispatch]);

  useEffect(() => {
    if (match?.status === MatchState.WALK_OVER) {
      setPollingTime(undefined);
    }
  }, [match?.status]);

  if (isLoading || !match) return <CenterLoading />;

  return (
    <Box
      mt={4}
      key={match.status}
    >
      <MatchDetails
        match={match}
        onBackToMatchList={() => navigate(`/tournaments/${tournamentData.id}/matches`)}
      />
    </Box>
  );
}
