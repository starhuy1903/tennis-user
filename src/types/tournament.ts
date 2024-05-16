import {
  Gender,
  ParticipantType,
  TournamentFormat,
  TournamentPhase,
  TournamentRole,
  TournamentStatus,
} from 'constants/tournament';

import { BaseType } from './base';
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
  format: TournamentFormat.ROUND_ROBIN | TournamentFormat.KNOCKOUT;
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
  status: TournamentStatus;
  phase: TournamentPhase;
  isCreator: boolean;
  group: Group;
};

export type OpenTournament = BaseType &
  Omit<OpenTournamentPayload, 'purchasedPackageId'> & {
    participants: number;
    image: string | null;
    status: TournamentStatus;
    phase: TournamentPhase;
    purchasedPackage: UserPackage;
    tournamentRoles: TournamentRole[];
  };

export type UpdateTournamentPayload = Omit<OpenTournamentPayload, 'purchasedPackageId'>;
