import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { TournamentStanding } from 'types/tournament/standing';

export const { useGetStandingsQuery, useLazyGetStandingsQuery } = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getStandings: build.query<TournamentStanding, number>({
      query: (id) => urlWithCorePrefix(`tournaments/${id}/standings`),
    }),
  }),
});
