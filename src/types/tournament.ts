import { GroupTournamentFormat, GroupTournamentPhase, GroupTournamentStatus } from 'constants/group-tournament';
import {
  Gender,
  ParticipantType,
  TournamentFormat,
  TournamentPhase,
  TournamentRole,
  TournamentStatus,
} from 'constants/tournament';

import { Group } from './group';
import { UserPackage } from './package';

export type BaseTournamentPayload = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  address: string;
  image: string;
};

export type GroupTournamentPayload = BaseTournamentPayload & {
  groupId: number;
  format: GroupTournamentFormat;
};

export type OpenTournamentPayload = BaseTournamentPayload & {
  contactPersonName: string;
  contactNumber: string;
  contactEmail: string;
  registrationDueDate: string;
  purchasedPackageId: string;
  maxParticipants: number;
  gender: Gender;
  participantType: ParticipantType;
  playersBornAfterDate: string;
  format: TournamentFormat;
};

export type GroupTournament = Omit<GroupTournamentPayload, 'groupId'> & {
  id: number;
  participants: number;
  status: GroupTournamentStatus;
  phase: GroupTournamentPhase;
  isCreator: boolean;
  group: Group;
  maxParticipants: number;
};

export type OpenTournament = Omit<OpenTournamentPayload, 'purchasedPackageId'> & {
  id: number;
  participants: number;
  image: string | null;
  status: TournamentStatus;
  phase: TournamentPhase;
  purchasedPackage: UserPackage;
  tournamentRoles: TournamentRole[];
};

export type UpdateTournamentPayload = Omit<OpenTournamentPayload, 'purchasedPackageId'>;

export type UpdateGroupTournamentPayload = Omit<GroupTournamentPayload, 'groupId'>;
