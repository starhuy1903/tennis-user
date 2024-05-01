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
  id: number;
  user1: Player;
  user2?: Player;
  isWinner: boolean | null;
  totalElo: number;
};

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
  videoUrl?: string;
};

export type Round = {
  title: string;
  matches: Match[];
};

export type TournamentFixture = {
  // Can use both roundRobinRounds and knockoutRounds for "group_playoff" format
  roundRobinRounds?: Round[];
  knockoutRounds?: Round[];
  format: TournamentFormat;
  participantType: ParticipantType;
  status: FixtureStatus;
};
