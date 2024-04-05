import {
  Gender,
  ParticipantType,
  TournamentFormat,
  TournamentPhase,
  TournamentScope,
  TournamentStatus,
} from 'constants/tournament';

import { Group } from './group';
import { UserPackage } from './package';

export type BaseTournamentPayload = {
  name: string;
  description: string;
  contactPersonName: string;
  contactNumber: string;
  contactEmail: string;
  startDate: string;
  endDate: string;
  registrationDueDate: string;
  address: string;
  format: TournamentFormat;
  maxParticipants: number;
  gender: Gender;
  participantType: ParticipantType;
  playersBornAfterDate: string;
  purchasedPackageId: number;
};

export type GroupTournamentPayload = BaseTournamentPayload & {
  scope: TournamentScope.GROUP;
  groupId: number;
};

export type OpenTournamentPayload = BaseTournamentPayload & {
  scope: TournamentScope.OPEN;
};

export type TournamentPayload = GroupTournamentPayload | OpenTournamentPayload;

export type BaseTournament = Omit<TournamentPayload, 'purchasedPackageId'> & {
  id: number;
  participants: number;
  imageUrl: string;
  status: TournamentStatus;
  phase: TournamentPhase;
  purchasedPackage: UserPackage;
  isCreator: boolean;
};

export type GroupTournament = BaseTournament & {
  group: Group;
};

export type OpenTournament = BaseTournament;

export type Tournament = GroupTournament | OpenTournament;
