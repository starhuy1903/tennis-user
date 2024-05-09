import { RegistrationStatus } from 'constants/tournament-participants';

import { UserProfile } from './user';

export type OpenTournamentParticipant = {
  user1: UserProfile;
  user2?: UserProfile;
  appliedDate: string;
};

export type OpenTournamentApplicant = OpenTournamentParticipant & {
  message: string;
  status: RegistrationStatus;
};
