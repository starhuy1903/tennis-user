import { UserPackage } from 'types/package';
import { OpenTournament } from 'types/tournament';

export type TournamentSliceType = OpenTournament & {
  purchasedPackage: UserPackage | null;
};
