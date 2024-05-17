import { ParticipantType } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';

import { apiWithToastSlice } from '../../baseApiSlice';
import { urlWithCorePrefix } from '../../helper';

export const {
  useGetOpenTournamentApplicantsQuery,
  useLazyGetOpenTournamentApplicantsQuery,
  useApproveTournamentApplicantMutation,
  useRejectTournamentApplicantMutation,
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
    finalizeApplicant: build.mutation<void, number>({
      query: (tournamentId) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/finalize`),
        method: 'PATCH',
      }),
    }),
  }),
});
