import { MemberRole } from 'constants/group';

export type GroupTournamentUser = {
  id: number;
  email: string;
  name: string;
  image?: string;
  role: MemberRole;
};

export type GroupTournamentParticipant = {
  userId: number;
  groupTournamentId: number;
  user: GroupTournamentUser;
  createdAt: string;
  updatedAt: string;
};
