import { GroupTournamentFormat } from 'constants/group-tournament';
import { ParticipantType } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';

import { Round } from './tournament-fixtures';

export type GroupTournamentFixture = {
  rounds: Round[];
  format: GroupTournamentFormat;
  participantType: ParticipantType.SINGLE;
  status: FixtureStatus;
};

export type CreateGroupFixtureRequest = {
  format: GroupTournamentFormat;
  fixtureStartDate: string;
  fixtureEndDate: string;
  matchesStartTime: string;
  matchesEndTime: string;
  matchDuration: number;
  breakDuration: number; // in minutes
  venue: string;
  groups?: {
    id: string;
    title: string;
    numberOfProceeders: number;
    teams: string[];
  }[];
};

export type EmptyGroupFixture = {
  status: FixtureStatus.NEW;
};

export type BaseGenerateGroupFixture = {
  id: string;
  participantType: ParticipantType.SINGLE;
  format: GroupTournamentFormat;
};

export type TempGroupFixture = BaseGenerateGroupFixture & {
  status: FixtureStatus.NEW;
};

export type DraftGroupFixture = BaseGenerateGroupFixture &
  Omit<CreateGroupFixtureRequest, 'format'> & {
    status: FixtureStatus.DRAFT;
  };

export type GeneratedGroupFixture = TempGroupFixture | DraftGroupFixture;

export type GeneratedNewRoundRobinGroupFixture = GeneratedGroupFixture & {
  roundRobinGroups: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  }[];
};

export type GeneratedNewKnockoutGroupFixture = GeneratedGroupFixture & {
  knockoutGroup: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  };
};

export type GeneratedNewGroupFixture = GeneratedNewRoundRobinGroupFixture | GeneratedNewKnockoutGroupFixture;

export type GroupFixtureResponse = EmptyGroupFixture | GeneratedNewGroupFixture;

export type BaseSaveGroupFixture = {
  id: string;
  format: GroupTournamentFormat;
  fixtureStartDate: string;
  fixtureEndDate: string;
  matchesStartTime: string;
  matchesEndTime: string;
  matchDuration: number;
  breakDuration: number;
  venue: string;
  status: FixtureStatus;
};

export type SaveRoundRobinGroupFixtureRequest = BaseSaveGroupFixture & {
  roundRobinGroups: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  }[];
};

export type SaveKnockoutGroupFixtureRequest = BaseSaveGroupFixture & {
  knockoutGroup: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  };
};

export type SaveGroupFixture = SaveRoundRobinGroupFixtureRequest | SaveKnockoutGroupFixtureRequest;

export const isGeneratedNewGroupFixtureType = (fixture: GroupFixtureResponse): fixture is GeneratedNewGroupFixture => {
  return 'id' in fixture;
};

export const isGeneratedNewRoundRobinGroupFixture = (
  fixture: GroupFixtureResponse
): fixture is GeneratedNewRoundRobinGroupFixture => {
  return 'roundRobinGroups' in fixture && fixture.format === GroupTournamentFormat.ROUND_ROBIN;
};

export const isGeneratedNewKnockoutGroupFixture = (
  fixture: GroupFixtureResponse
): fixture is GeneratedNewKnockoutGroupFixture => {
  return 'knockoutGroup' in fixture && fixture.format === GroupTournamentFormat.KNOCKOUT;
};
