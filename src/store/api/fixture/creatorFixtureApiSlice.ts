import { apiWithToastSlice } from '../baseApiSlice';
import { urlWithCorePrefix } from '../helper';

const creatorApiSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    getFixture: build.query<void, { tournamentId: number }>({
      query: ({ tournamentId }) => urlWithCorePrefix(`tournament/${tournamentId}/fixtures`),
    }),
    // generateFixture: build.mutation<,  GeneratedFixturePayload>({
    //   query: ({tournamentId, ...rest}) => ({
    //     url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/generate`),
    //     method: 'POST',
    //     body: rest,
    //   }),
    // }),
    // createMatch: build.mutation<void, {tournamentId: number; fixtureId: number; data: any}>({
    //   query: ({tournamentId, fixtureId, data}) => ({
    //     url: urlWithCorePrefix(`tournaments/${tournamentId}/fixtures/${fixtureId}/matches`),
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
  }),
});

export const { useGetFixtureQuery } = creatorApiSlice;
