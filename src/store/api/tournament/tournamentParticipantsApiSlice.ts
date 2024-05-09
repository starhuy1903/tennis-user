import { ParticipantType } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { OpenTournamentApplicant, OpenTournamentParticipant } from 'types/open-tournament-participants';
import { TournamentRegistrationPayload } from 'types/tournament-registration';

import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const tournamentParticipantsApiToastSlice = apiWithToastSlice.injectEndpoints({
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
    getOpenTournamentParticipants: build.query<
      GetListResult<OpenTournamentParticipant> & {
        participantType: ParticipantType;
        maxParticipants: number;
      },
      GetPagingListOptions & { tournamentId: number }
    >({
      query: (args) => ({
        url: urlWithCorePrefix(`tournaments/${args.tournamentId}/participants`),
        params: {
          page: args.page,
          take: args.take,
          order: args.order,
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
    applyTournament: build.mutation<void, TournamentRegistrationPayload>({
      query: ({ tournamentId, user2Email, message }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/apply`),
        method: 'POST',
        body: { user2Email, message },
      }),
    }),
    getMyApplication: build.query<OpenTournamentApplicant, { tournamentId: number }>({
      query: ({ tournamentId }) => ({
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
      GetListResult<OpenTournamentApplicant>,
      { tournamentId: number; status: RegistrationStatus.INVITING | RegistrationStatus.CANCELED }
    >({
      query: ({ tournamentId, status }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/invitations`),
        params: {
          status,
        },
      }),
    }),
    approveInvitation: build.mutation<void, { tournamentId: number; inviterId: string }>({
      query: ({ tournamentId, inviterId }) => ({
        url: urlWithCorePrefix(`tournaments/${tournamentId}/applicants/invitations/approve`),
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

export const {
  useGetOpenTournamentParticipantsQuery,
  useLazyGetOpenTournamentParticipantsQuery,
  useGetOpenTournamentApplicantsQuery,
  useLazyGetOpenTournamentApplicantsQuery,
  useApproveTournamentApplicantMutation,
  useRejectTournamentApplicantMutation,
  useGetMyApplicationQuery,
  useDeleteApplicationMutation,
  useApplyTournamentMutation,
  useLazyGetMyApplicationQuery,
  useGetInvitationsQuery,
  useLazyGetInvitationsQuery,
  useApproveInvitationMutation,
  useRejectInvitationMutation,
} = tournamentParticipantsApiToastSlice;
