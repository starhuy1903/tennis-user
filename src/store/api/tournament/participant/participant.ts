import { RegistrationStatus } from 'constants/tournament-participants';
import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { OpenTournamentApplicant } from 'types/open-tournament-participants';
import { TournamentRegistrationPayload } from 'types/tournament-registration';

export const {
  useApplyTournamentMutation,
  useGetMyApplicationQuery,
  useDeleteApplicationMutation,
  useGetInvitationsQuery,
  useLazyGetInvitationsQuery,
  useApproveInvitationMutation,
  useRejectInvitationMutation,
} = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    applyTournament: build.mutation<void, TournamentRegistrationPayload>({
      query: ({ tournamentId, user2Email, message }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/apply`),
        method: 'POST',
        body: { user2Email, message },
      }),
    }),
    getMyApplication: build.query<OpenTournamentApplicant, number>({
      query: (tournamentId) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/apply`),
      }),
      transformResponse: (response: { data: OpenTournamentApplicant }) => response.data,
    }),
    deleteApplication: build.mutation<void, { tournamentId: number }>({
      query: ({ tournamentId }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/apply`),
        method: 'DELETE',
      }),
    }),
    getInvitations: build.query<
      OpenTournamentApplicant[],
      { tournamentId: number; status: RegistrationStatus.INVITING | RegistrationStatus.CANCELED }
    >({
      query: ({ tournamentId, status }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/invitations`),
        params: {
          status,
        },
      }),
      transformResponse: (response: { data: OpenTournamentApplicant[] }) => response.data,
    }),
    approveInvitation: build.mutation<void, { tournamentId: number; inviterId: string }>({
      query: ({ tournamentId, inviterId }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/invitations/accept`),
        method: 'POST',
        body: { inviterId },
      }),
    }),
    rejectInvitation: build.mutation<void, { tournamentId: number; inviterId: string }>({
      query: ({ tournamentId, inviterId }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/invitations/reject`),
        method: 'POST',
        body: { inviterId },
      }),
    }),
  }),
});
