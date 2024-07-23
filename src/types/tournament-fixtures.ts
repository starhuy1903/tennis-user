import { MatchState } from 'constants/match';
import { ParticipantType, TournamentFormat } from 'constants/tournament';
import { FixtureStatus } from 'constants/tournament-fixtures';

import { MatchFinalScore, SetGame } from './match';
import { Referee } from './open-tournament-participants';
import { UserProfile } from './user';

export type Score = {
  team1: number;
  team2: number;
  tiebreakTeam1?: number;
  tiebreakTeam2?: number;
  time: number; // Minute when the set was finished
  teamWin: number; // 1 or 2
};

export type Player = UserProfile;

export type Team = {
  id: string;
  user1: Player;
  user2?: Player;
  isWinner: boolean | null;
  totalElo: number;
};

export type EditMatchTeam = Omit<Team, 'isWinner'>;

export type Match = {
  id: string;
  time: string;
  date: string;
  duration: number;
  venue: string;
  status: MatchState;
  teams: {
    team1: Team;
    team2: Team;
  };
  scores: Score[];
  finalScore: MatchFinalScore;
  refereeId: string | null;
  referee?: Pick<Referee, 'id' | 'name' | 'image'>;
  nextMatchId: string | null;
  title: string;
  matchStartDate: string | null;
  teamWinnerId?: string | null;
  teamId1?: string | null;
  teamId2?: string | null;
  team1MatchScore?: number;
  team2MatchScore?: number;
  sets?: SetGame[];
  // videoUrl?: string;
};

export type FixtureTeam = {
  id: string;
  user1: Player;
  user2: Player | null;
};

export type FixtureMatch = {
  id: string;
  nextMatchId: string | null;
  title: string;
  matchStartDate: string;
  duration: number;
  status: MatchState;
  teams: {
    team1?: Team;
    team2?: Team;
  };
  refereeId: string | null;
};

export type Round = {
  id: string;
  title: string;
  matches: Match[];
};

export type CreateFixtureRequest = {
  format: TournamentFormat;
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

export type EmptyFixture = {
  status: FixtureStatus.NEW;
};

export type BaseGenerateFixture = {
  id: string;
  participantType: ParticipantType;
  format: TournamentFormat;
};

export type TempFixture = BaseGenerateFixture & {
  status: FixtureStatus.NEW;
};

export type DraftFixture = BaseGenerateFixture &
  Omit<CreateFixtureRequest, 'format'> & {
    status: FixtureStatus.DRAFT;
  };

export type GeneratedFixture = TempFixture | DraftFixture;

export type GeneratedNewRoundRobinFixture = GeneratedFixture & {
  roundRobinGroups: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  }[];
};

export type GeneratedNewKnockoutFixture = GeneratedFixture & {
  knockoutGroup: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  };
};

export type GeneratedNewGroupPlayoffFixture = GeneratedFixture & {
  roundRobinGroups: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
    numberOfProceeders: number;
    status: 'scheduled' | 'walk_over' | 'done';
  }[];
  knockoutGroup: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  };
  groups: GeneratedGroup[];
};

export type GeneratedNewFixture =
  | GeneratedNewRoundRobinFixture
  | GeneratedNewKnockoutFixture
  | GeneratedNewGroupPlayoffFixture;

export type FixtureResponse = EmptyFixture | GeneratedNewFixture;

export type BaseSaveFixture = {
  id: string;
  format: TournamentFormat;
  fixtureStartDate: string;
  fixtureEndDate: string;
  matchesStartTime: string;
  matchesEndTime: string;
  matchDuration: number;
  breakDuration: number;
  venue: string;
  status: FixtureStatus;
};

export type SaveRoundRobinFixtureRequest = BaseSaveFixture & {
  roundRobinGroups: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  }[];
};

export type SaveKnockoutFixtureRequest = BaseSaveFixture & {
  knockoutGroup: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  };
};

export type SaveGroupPlayoffFixtureRequest = BaseSaveFixture & {
  knockoutGroup: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  };
  roundRobinGroups: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  }[];
};

export type SaveFixture = SaveRoundRobinFixtureRequest | SaveKnockoutFixtureRequest | SaveGroupPlayoffFixtureRequest;

export const isGeneratedNewFixtureType = (fixture: FixtureResponse): fixture is GeneratedNewFixture => {
  return 'id' in fixture;
};

export const isGeneratedNewRoundRobinFixture = (fixture: FixtureResponse): fixture is GeneratedNewRoundRobinFixture => {
  return 'roundRobinGroups' in fixture && fixture.format === TournamentFormat.ROUND_ROBIN;
};

export const isGeneratedNewKnockoutFixture = (fixture: FixtureResponse): fixture is GeneratedNewKnockoutFixture => {
  return 'knockoutGroup' in fixture && fixture.format === TournamentFormat.KNOCKOUT;
};

export const isGeneratedNewGroupPlayoffFixture = (
  fixture: FixtureResponse
): fixture is GeneratedNewGroupPlayoffFixture => {
  return (
    'knockoutGroup' in fixture && 'roundRobinGroups' in fixture && fixture.format === TournamentFormat.GROUP_PLAYOFF
  );
};

export type GeneratedGroup = {
  id: string;
  title: string;
  numberOfProceeders: number;
  teams: {
    id: string;
    name: string;
    totalElo: number;
    point: number;
    user1: {
      id: string;
      name: string;
      image: string;
    };
    user2: {
      id: string;
      name: string;
      image: string;
    } | null;
  }[];
};
