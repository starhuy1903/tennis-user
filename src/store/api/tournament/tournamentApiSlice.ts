import { ParticipantType, TournamentStatus } from 'constants/tournament';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { OpenTournamentParticipant } from 'types/open-tournament-participants';
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
    getOpenTournamentParticipants: build.query<
      GetListResult<OpenTournamentParticipant> & {
        participantType: ParticipantType;
        maxParticipants: number;
      },
      GetPagingListOptions & { tournamentId: number }
    >({
      query: (args) => ({
        url: `core/tournaments/${args.tournamentId}/participants`,
        params: {
          page: args.page,
          take: args.take,
          order: args.order,
        },
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
  useGetOpenTournamentParticipantsQuery,
  useLazyGetOpenTournamentParticipantsQuery,
} = tournamentApiToastSlice;
