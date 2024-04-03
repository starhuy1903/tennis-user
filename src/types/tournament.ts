import {
  Gender,
  ParticipantType,
  TournamentFormat,
  TournamentPhase,
  TournamentScope,
  TournamentStatus,
} from 'constants/tournament';

import { UserPackage } from './package';

export type BaseTournament = {
  name: string;
  description: string;
  contactPersonName: string;
  contactNumber: string;
  contactEmail: string;
  startDate: string;
  endDate: string;
  registrationDueDate: string;
  dueTime: string;
  address: string;
  format: TournamentFormat;
  maxParticipants: number;
  gender: Gender;
  participantType: ParticipantType;
  playersBornAfterDate: string;
  purchasedPackageId: number;
};

export type GroupTournamentPayload = BaseTournament & {
  scope: TournamentScope.GROUP;
  groupId: number;
};

export type OpenTournamentPayload = BaseTournament & {
  scope: TournamentScope.OPEN;
};

export type TournamentPayload = GroupTournamentPayload | OpenTournamentPayload;

export type Tournament = Omit<TournamentPayload, 'purchasedPackageId'> & {
  participants: number;
  imageUrl: string;
  status: TournamentStatus;
  phase: TournamentPhase;
  purchasedPackage: UserPackage;
  isCreator: boolean;
};
