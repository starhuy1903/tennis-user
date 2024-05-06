import { Gender } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';

export type OpenTournamentUser = {
  id: number;
  name: string;
  email: string;
  image?: string;
  gender: Gender;
  elo: number;
};

export type OpenTournamentParticipant = {
  user1: OpenTournamentUser;
  user2?: OpenTournamentUser;
  appliedDate: string;
};

export type OpenTournamentApplicant = OpenTournamentParticipant & {
  message: string;
  status: RegistrationStatus;
};
