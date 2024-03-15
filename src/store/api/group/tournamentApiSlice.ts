import { Tournament, TournamentStatus } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';

const tournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getTournaments: build.query<Tournament[], { groupId: number; tournamentStatus?: TournamentStatus }>({
      query: (args) => ({
        url: `tournaments/groups/${args.groupId}`,
        params: { status: args?.tournamentStatus },
      }),
      transformResponse: (response: { data: Tournament[] }) => response.data,
    }),
  }),
});

export const { useGetTournamentsQuery, useLazyGetTournamentsQuery } = tournamentApiToastSlice;
