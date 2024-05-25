import { ParticipantType } from 'constants/tournament';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { OpenTournamentParticipant } from 'types/open-tournament-participants';

import { apiWithToastSlice } from '../../baseApiSlice';
import { urlWithCorePrefix } from '../../helper';

export const { useGetOpenTournamentParticipantsQuery, useLazyGetOpenTournamentParticipantsQuery } =
  apiWithToastSlice.injectEndpoints({
    endpoints: (build) => ({
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
    }),
  });
