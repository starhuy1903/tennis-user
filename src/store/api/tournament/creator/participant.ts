import { ParticipantType } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { OpenTournamentApplicant, Referee } from 'types/open-tournament-participants';
import { SelectSeedPayload } from 'types/tournament/participant';

import { apiWithToastSlice } from '../../baseApiSlice';
import { urlWithCorePrefix } from '../../helper';

export const {
  useGetOpenTournamentApplicantsQuery,
  useLazyGetOpenTournamentApplicantsQuery,
  useApproveTournamentApplicantMutation,
  useRejectTournamentApplicantMutation,
  useGetRefereesQuery,
  useLazyGetRefereesQuery,
  useAddRefereeMutation,
  useSeedingParticipantMutation,
  useFinalizeApplicantMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getOpenTournamentApplicants: build.query<
      GetListResult<OpenTournamentApplicant> & {
        participantType: ParticipantType;
        maxParticipants: number;
      },
      GetPagingListOptions & { tournamentId: number; status?: RegistrationStatus }
    >({
      query: (args) => ({
        url: urlWithCorePrefix(`tournaments/${args.tournamentId}/applicants`),
        params: {
          page: args.page,
          take: args.take,
          order: args.order,
          status: args?.status,
        },
      }),
    }),
    approveTournamentApplicant: build.mutation<void, { tournamentId: number; userId: string }>({
      query: ({ tournamentId, userId }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/approve`),
        method: 'POST',
        body: { userId },
      }),
    }),
    rejectTournamentApplicant: build.mutation<void, { tournamentId: number; userId: string }>({
      query: ({ tournamentId, userId }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/reject`),
        method: 'POST',
        body: { userId },
      }),
    }),
    getReferees: build.query<GetListResult<Referee>, number>({
      query: (tournamentId) => urlWithCorePrefix(`tournaments/${tournamentId}/referees`),
    }),
    addReferee: build.mutation<void, { tournamentId: number; email: string }>({
      query: ({ tournamentId, email }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/referees`),
        method: 'POST',
        body: { email },
      }),
    }),
    seedingParticipant: build.mutation<any, SelectSeedPayload>({
      query: ({ tournamentId, userId, seed }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/seeds`),
        method: 'POST',
        body: { userId, seed },
      }),
    }),
    finalizeApplicant: build.mutation<void, number>({
      query: (tournamentId) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/finalize`),
        method: 'POST',
      }),
    }),
  }),
});
