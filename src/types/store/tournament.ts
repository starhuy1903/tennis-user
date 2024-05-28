import { OpenTournament } from 'types/tournament';

export type TournamentSliceType = {
  data: OpenTournament;
  shouldRefreshData: boolean;
  showBackground: boolean;
};
