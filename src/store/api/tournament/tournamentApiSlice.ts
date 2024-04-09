import { TournamentStatus } from 'constants/tournament';
import { OpenTournament, OpenTournamentPayload } from 'types/tournament';
import { TournamentRegistrationPayload } from 'types/tournament-registration';

import { apiWithToastSlice } from '../baseApiSlice';

const tournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getOpenTournaments: build.query<OpenTournament[], { tournamentStatus?: TournamentStatus }>({
      query: (args) => ({
        url: `core/tournaments`,
        params: { status: args?.tournamentStatus },
      }),
    }),
    createOpenTournament: build.mutation<OpenTournament, OpenTournamentPayload>({
      query: (payload) => ({
        url: `core/tournaments`,
        method: 'POST',
        body: payload,
      }),
    }),
    getOpenTournamentDetails: build.query<OpenTournament, number>({
      query: (id) => `core/tournaments/${id}/general-info`,
    }),
    createTournamentRegistration: build.mutation<void, TournamentRegistrationPayload>({
      query: (payload) => ({
        url: `core/tournaments/registration`,
        method: 'POST',
        body: payload,
      }),
    }),
    moveToNextPhase: build.mutation<OpenTournament, number>({
      query: (id) => ({
        url: `core/tournaments/${id}/next-phase`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetOpenTournamentsQuery,
  useLazyGetOpenTournamentsQuery,
  useCreateOpenTournamentMutation,
  useGetOpenTournamentDetailsQuery,
  useLazyGetOpenTournamentDetailsQuery,
  useCreateTournamentRegistrationMutation,
  useMoveToNextPhaseMutation,
} = tournamentApiToastSlice;
