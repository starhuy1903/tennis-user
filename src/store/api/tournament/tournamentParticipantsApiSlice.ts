import { ParticipantType } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { OpenTournamentApplicant, OpenTournamentParticipant } from 'types/open-tournament-participants';

import { apiWithToastSlice } from '../baseApiSlice';

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
        url: `core/tournaments/${args.tournamentId}/applicants`,
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
        url: `core/tournaments/${args.tournamentId}/participants`,
        params: {
          page: args.page,
          take: args.take,
          order: args.order,
        },
      }),
    }),
    approveTournamentApplicant: build.mutation<void, { tournamentId: number; userId: number }>({
      query: ({ tournamentId, userId }) => ({
        url: `core/tournaments/${tournamentId}/applicants/approve`,
        method: 'POST',
        body: { userId },
      }),
    }),
    rejectTournamentApplicant: build.mutation<void, { tournamentId: number; userId: number }>({
      query: ({ tournamentId, userId }) => ({
        url: `core/tournaments/${tournamentId}/applicants/reject`,
        method: 'POST',
        body: { userId },
      }),
    }),
    getMyApplication: build.query<OpenTournamentApplicant, { tournamentId: number }>({
      query: ({ tournamentId }) => ({
        url: `core/tournaments/${tournamentId}/applicants/apply`,
      }),
    }),
    deleteApplication: build.mutation<void, { tournamentId: number }>({
      query: ({ tournamentId }) => ({
        url: `core/tournaments/${tournamentId}/applicants/apply`,
        method: 'DELETE',
      }),
    }),
    getInvitations: build.query<GetListResult<OpenTournamentApplicant>, { tournamentId: number }>({
      query: ({ tournamentId }) => ({
        url: `core/tournaments/${tournamentId}/applicants/invitations`,
      }),
    }),
    approveInvitation: build.mutation<void, { tournamentId: number; inviterId: number }>({
      query: ({ tournamentId, inviterId }) => ({
        url: `core/tournaments/${tournamentId}/applicants/invitations/approve`,
        method: 'POST',
        body: { inviterId },
      }),
    }),
    rejectInvitation: build.mutation<void, { tournamentId: number; inviterId: number }>({
      query: ({ tournamentId, inviterId }) => ({
        url: `core/tournaments/${tournamentId}/applicants/invitations/reject`,
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
  useLazyGetMyApplicationQuery,
  useGetInvitationsQuery,
  useLazyGetInvitationsQuery,
  useApproveInvitationMutation,
  useRejectInvitationMutation,
} = tournamentParticipantsApiToastSlice;
