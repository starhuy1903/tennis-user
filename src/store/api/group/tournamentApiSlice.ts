import { Tournament } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';

const tournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getTournaments: build.mutation<Tournament[], number>({
      query: (groupId) => `groups/${groupId}/tournaments`,
    }),
  }),
});

export const { useGetTournamentsMutation } = tournamentApiToastSlice;
