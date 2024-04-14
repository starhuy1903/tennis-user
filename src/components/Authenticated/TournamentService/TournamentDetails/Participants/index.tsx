import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import { TournamentPhase } from 'constants/tournament';
import { useGetOpenTournamentDetailsQuery } from 'store/api/tournament/tournamentApiSlice';

import ApplicantList from './ApplicantList';
import MyApplication from './MyApplication';
import ParticipantList from './ParticipantList';

export default function Participants() {
  const { tournamentId } = useParams();

  const { data, isLoading } = useGetOpenTournamentDetailsQuery(parseInt(tournamentId!));

  if (isLoading) return <CircularProgress />;

  if (data?.phase === TournamentPhase.NEW || data?.phase === TournamentPhase.PUBLISHED) {
    if (data.isCreator) {
      return <ApplicantList />;
    } else {
      return <MyApplication />;
    }
  } else {
    return <ParticipantList />;
  }
}
