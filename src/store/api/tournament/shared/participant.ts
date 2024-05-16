import { ParticipantType } from 'constants/tournament';
import { RegistrationStatus } from 'constants/tournament-participants';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { OpenTournamentApplicant, OpenTournamentParticipant } from 'types/open-tournament-participants';

import { apiWithToastSlice } from '../../baseApiSlice';
import { urlWithCorePrefix } from '../../helper';

export const {
  useGetOpenTournamentParticipantsQuery,
  useLazyGetOpenTournamentParticipantsQuery,
  useGetOpenTournamentApplicantsQuery,
  useLazyGetOpenTournamentApplicantsQuery,
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
