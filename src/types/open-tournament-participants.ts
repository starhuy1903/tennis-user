import { Gender } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';

import { UserProfile } from './user';

export type OpenTournamentParticipant = {
  user1: UserProfile;
  user2?: UserProfile;
  appliedDate: string;
  seed: number | null;
};

export type OpenTournamentApplicant = OpenTournamentParticipant & {
  message: string;
  status: RegistrationStatus;
};
export type Referee = {
  id: string;
  phoneNumber: string;
  name: string;
  image: string;
  gender: Gender;
  dob: string;
  email?: string;
};
