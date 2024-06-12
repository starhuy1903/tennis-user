import { MatchState } from 'constants/match';

import { Team } from './tournament-fixtures';

export type EditMatchPayload = {
  id: string;
  name: string;
  dateTime: string;
  duration: number;
  venue: string;
  team1Id: string;
  team2Id: string;
  refereeId: string;
};

export type MatchFinalScore = {
  team1: number;
  team2: number;
  teamWinnerId: string | null;
};

export enum SetGameStatus {
  NOT_STARTED = 'not_started',
  ON_GOING = 'on_going',
  ENDED = 'ended',
}

export enum GameScoreType {
  INIT = 'init',
  WINNER = 'winner',
  ACE = 'ace',
}

export type GameScore = {
  id: number;
  type: GameScoreType;
  team1Score: string;
  team2Score: string;
  teamWinId: string | null;
  time: string | null;
};

export type Game = {
  id: number;
  teamWinId: string;
  scores: GameScore[];
};

export type SetGame = {
  id: number;
  isTieBreak: boolean;
  status: SetGameStatus;
  teamWinId: string;
  setStartTime: string;
  games: Game[];
  setFinalScore: {
    team1: number;
    team2: number;
    tieBreak: null;
  };
};

export type MatchMetaData = {
  id: string;
  status: MatchState;
  team1: Team;
  team2: Team;
  sets: SetGame[];
  venue: string;
  teamWinnerId: string | null;
  matchStartDate: string;
  matchEndDate: string | null;
  matchFinalScore: MatchFinalScore;
};

export type TeamType = 1 | 2;
