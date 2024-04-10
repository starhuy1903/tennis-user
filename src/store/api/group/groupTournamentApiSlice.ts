import { TournamentStatus } from 'constants/tournament';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { Participant, ParticipantDto } from 'types/group-tournament';
import { GroupTournament, GroupTournamentPayload } from 'types/tournament';

import { apiWithToastSlice } from '../baseApiSlice';

const groupTournamentApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getGroupTournaments: build.query<GroupTournament[], { tournamentStatus?: TournamentStatus; groupId: number }>({
      query: (args) => ({
        url: `core/groups/${args.groupId}/tournaments`,
        params: { status: args?.tournamentStatus },
      }),
    }),
    getGroupTournamentDetails: build.query<
      GroupTournament,
      {
        groupId: number;
        tournamentId: number;
      }
    >({
      query: (args) => {
        return `core/groups/${args.groupId}/tournaments/${args.tournamentId}/general-info`;
      },
    }),
    createGroupTournament: build.mutation<GroupTournament, GroupTournamentPayload>({
      query: (args) => ({
        url: `core/groups/${args.groupId}/tournaments`,
        method: 'POST',
        body: args,
      }),
    }),
    getGroupTournamentParticipants: build.query<
      GetListResult<ParticipantDto> & { isCreator: boolean },
      GetPagingListOptions & { groupId: number; tournamentId: number }
    >({
      query: (args) => ({
        url: `core/groups/${args.groupId}/tournaments/${args.tournamentId}/participants`,
        params: {
          page: args.page,
          take: args.take,
          order: args.order,
        },
      }),
    }),
    getGroupTournamentNonParticipants: build.query<Participant[], { groupId: number; tournamentId: number }>({
      query: (args) => ({
        url: `core/groups/${args.groupId}/tournaments/${args.tournamentId}/non-participants`,
      }),
    }),
    addParticipants: build.mutation<void, { groupId: number; tournamentId: number; userIds: number[] }>({
      query: (args) => ({
        url: `core/groups/${args.groupId}/tournaments/${args.tournamentId}/participants`,
        method: 'POST',
        body: { userIds: args.userIds },
      }),
    }),
  }),
});

export const {
  useGetGroupTournamentsQuery,
  useLazyGetGroupTournamentsQuery,
  useGetGroupTournamentDetailsQuery,
  useLazyGetGroupTournamentDetailsQuery,
  useCreateGroupTournamentMutation,
  useGetGroupTournamentParticipantsQuery,
  useLazyGetGroupTournamentParticipantsQuery,
  useGetGroupTournamentNonParticipantsQuery,
  useLazyGetGroupTournamentNonParticipantsQuery,
  useAddParticipantsMutation,
} = groupTournamentApiToastSlice;
