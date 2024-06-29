import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { GroupTournamentParticipant } from 'types/group-tournament-participants';

export const { useGetGroupTournamentParticipantsQuery, useLazyGetGroupTournamentParticipantsQuery } =
  apiWithToastSlice.injectEndpoints({
    endpoints: (build) => ({
      getGroupTournamentParticipants: build.query<
        GetListResult<GroupTournamentParticipant> & { isCreator: boolean },
        GetPagingListOptions & { groupId: number; tournamentId: number }
      >({
        query: (args) => ({
          url: urlWithCorePrefix(`groups/${args.groupId}/tournaments/${args.tournamentId}/participants`),
          params: {
            page: args.page,
            take: args.take,
            order: args.order,
          },
        }),
      }),
    }),
  });
