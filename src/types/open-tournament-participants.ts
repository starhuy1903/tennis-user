import { Gender } from 'constants/tournament';

export type OpenTournamentUser = {
  id: number;
  name: string;
  email: string;
  image?: string;
  gender: Gender;
};

export type OpenTournamentParticipant = {
  user1: OpenTournamentUser;
  user2?: OpenTournamentUser;
  appliedDate: string;
};
