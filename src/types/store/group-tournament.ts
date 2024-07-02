import { GroupTournament } from 'types/tournament';

export type GroupTournamentSliceType = {
  data: Omit<GroupTournament, 'group'>;
  shouldRefreshData: boolean;
  showBackground: boolean;
};
