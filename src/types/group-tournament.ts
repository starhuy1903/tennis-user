import { MemberRole } from 'constants/group';

export type Participant = {
  id: number;
  email: string;
  name: string;
  image?: string;
  role: MemberRole;
};

export type ParticipantDto = {
  userId: number;
  groupTournamentId: number;
  user: Participant;
  createdAt: string;
  updatedAt: string;
};
