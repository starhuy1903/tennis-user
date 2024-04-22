export enum MatchParticipantStatus {
  PLAYED = 'played',
  NO_PARTY = 'no_party',
  NO_SHOW = 'no_show',
  WALK_OVER = 'walk_over',
}

export enum MatchState {
  SCHEDULED = 'scheduled',
  NO_PARTY = 'no_party',
  NO_SHOW = 'no_show',
  WALK_OVER = 'walk_over',
  DONE = 'done',
  SCORE_DONE = 'score_done',
}

export type MatchParticipant = {
  id: string;
  resultText: string; // WON
  name: string;
  isWinner: boolean;
  status: MatchParticipantStatus | null;
};

export type Match = {
  id: string;
  name: string;
  startTime: string; // 09:00:00
  startDate: string; // 2024-03-20
  duration: number; // 60
  state: MatchState;
  nextMatchId: string | null; // Id for the next match in upper bracket, if it's final match it must be null
  tournamentRoundText: '4'; // Text for Round Header
  participants: MatchParticipant[];
};
