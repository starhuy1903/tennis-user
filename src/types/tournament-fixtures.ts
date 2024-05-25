import { ParticipantType, TournamentFormat } from 'constants/tournament';
import { FixtureStatus, MatchStatus } from 'constants/tournament-fixtures';

import { UserProfile } from './user';

export type Score = {
  team1: number;
  team2: number;
  tiebreakTeam1?: number;
  tiebreakTeam2?: number;
  time: number; // Minute when the set was finished
  teamWin: number; // 1 or 2
};

export type FinalScore = {
  team1: number;
  team2: number;
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
  status: MatchStatus;
  teams: {
    team1?: Team;
    team2?: Team;
  };
  scores: Score[];
  finalScore: FinalScore;
  refereeId: string | null;
  nextMatchId: string | null;
  title: string;
  matchStartDate: string | null;
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
  status: MatchStatus;
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

export type FixturePayload = {
  format: TournamentFormat;
  fixtureStartDate: string;
  fixtureEndDate: string;
  matchesStartTime: string;
  matchesEndTime: string;
  matchDuration: number;
  breakDuration: number; // in minutes
  venue: string;
};

export type TournamentFixture = FixturePayload & {
  // Can use both roundRobinRounds and knockoutRounds for "group_playoff" format
  roundRobinGroups?: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  }[];
  knockoutGroup?: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  };
  participantType: ParticipantType;
  status: FixtureStatus;
  id?: string;
};

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
  roundRobinGroups?: {
    id: string;
    title: string;
    isFinal: boolean;
    rounds: Round[];
  }[];
};

// export type SaveKnockoutFixtureRequest = BaseSaveFixture & {

// }
