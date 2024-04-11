import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import { TournamentPhase } from 'constants/tournament';
import { useGetOpenTournamentDetailsQuery } from 'store/api/tournament/tournamentApiSlice';

import { ApplicantList } from './ApplicantList';
import ParticipantList from './ParticipantList';

export default function Participants() {
  const { tournamentId } = useParams();

  const { data, isLoading } = useGetOpenTournamentDetailsQuery(parseInt(tournamentId!));

  console.log(data);

  if (isLoading) return <CircularProgress />;

  if (data?.phase === TournamentPhase.NEW || data?.phase === TournamentPhase.PUBLISHED) {
    return <ApplicantList />;
  } else {
    return <ParticipantList />;
  }
}
