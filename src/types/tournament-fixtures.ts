import { ParticipantType, TournamentFormat } from 'constants/tournament';
import { FixtureStatus, MatchStatus } from 'constants/tournament-fixtures';

export type Score = {
  set: string;
  game: number;
  tiebreak?: number;
};

export type Player = {
  id: number;
  name: string;
  image: string;
  elo: number;
  scores?: Score[];
  isWinner?: boolean;
};

// For round-robin type
export type Match = {
  id: string;
  name: string;
  time: string;
  date: string;
  duration: number;
  status: MatchStatus;
  player1: Player;
  player2: Player;
};

export type RoundRobinRounds = {
  matches: Match[];
  title: string;
};

// For knockout type
export type Seed = {
  id: string;
  name: string;
  time: string;
  date: string;
  duration: number;
  status: MatchStatus;
  teams: Player[];
};

export type KnockoutRound = {
  seeds: Seed[];
  title: string;
};

export type TournamentFixture = {
  // Can use both roundRobinRounds and knockoutRounds for "group_playoff" format
  roundRobinRounds?: RoundRobinRounds[];
  knockoutRounds?: KnockoutRound[];
  format: TournamentFormat;
  participantType: ParticipantType;
  status: FixtureStatus;
};
