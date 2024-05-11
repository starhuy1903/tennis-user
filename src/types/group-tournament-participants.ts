import { MemberRole } from 'constants/group';

export type GroupTournamentUser = {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: MemberRole;
};

export type GroupTournamentParticipant = {
  userId: string;
  groupTournamentId: number;
  user: GroupTournamentUser;
  createdAt: string;
  updatedAt: string;
};
