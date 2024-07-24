import { apiWithToastSlice } from 'store/api/baseApiSlice';
import { urlWithCorePrefix } from 'store/api/helper';
import { MatchMetaData } from 'types/match';
import { Match } from 'types/tournament-fixtures';

export const { useGetMatchesQuery, useLazyGetMatchesQuery, useGetMatchDetailsQuery, useLazyGetMatchDetailsQuery } =
  apiWithToastSlice.injectEndpoints({
    endpoints: (build) => ({
      getMatches: build.query<{ matches: Match[] }, number>({
        query: (tournamentId) => urlWithCorePrefix(`tournaments/${tournamentId}/matches`),
      }),
      getMatchDetails: build.query<MatchMetaData, string>({
        query: (matchId) => urlWithCorePrefix(`matches/${matchId}`),
      }),
    }),
  });
