import { ParticipantType, TournamentFormat } from 'constants/tournament';
import { FixtureStatus, MatchStatus } from 'constants/tournament-fixtures';

export type Score = {
  set: string;
  game: number;
  tiebreak?: number;
  min?: number;
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
  teams: Team[];
  videoUrl?: string;
};

export type Round = {
  title: string;
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
