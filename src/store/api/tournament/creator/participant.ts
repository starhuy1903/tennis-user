import { apiWithToastSlice } from '../../baseApiSlice';
import { urlWithCorePrefix } from '../../helper';

export const {
  useApproveTournamentApplicantMutation,
  useRejectTournamentApplicantMutation,
  useFinalizeApplicantMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
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
