import { ParticipantType, TournamentFormat } from 'constants/tournament';
import { FixtureStatus, MatchStatus } from 'constants/tournament-fixtures';

export type Score = {
  set: string;
  game: number;
  tiebreak?: number;
};

export type User = {
  id: number;
  name: string;
  image: string;
  elo: number;
};

export type Team = {
  id: number;
  user1: User;
  user2?: User;
  scores?: Score[];
  isWinner?: boolean;
  totalElo: number;
};

export type Match = {
  id: string;
  name: string;
  time: string;
  date: string;
  venue: string;
  duration: number;
  status: MatchStatus;
  teams: Team[];
};

export type Round = {
  title: string;
  matches: Match[];
  seeds: Match[]; // same as matches, used for react-brackets
};

export type TournamentFixture = {
  // Can use both roundRobinRounds and knockoutRounds for "group_playoff" format
  roundRobinRounds?: Round[];
  knockoutRounds?: Round[];
  format: TournamentFormat;
  participantType: ParticipantType;
  status: FixtureStatus;
};
