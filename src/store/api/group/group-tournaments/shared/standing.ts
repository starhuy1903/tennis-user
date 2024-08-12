import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { TournamentStanding } from 'types/tournament/standing';

export const { useGetStandingsQuery, useLazyGetStandingsQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getStandings: build.query<TournamentStanding, { groupId: number; tournamentId: number }>({
      query: (args) => urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/standings`),
    }),
  }),
});
