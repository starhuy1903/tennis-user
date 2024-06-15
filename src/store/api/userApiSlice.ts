import { MatchState } from 'constants/match';
import { GetListResult, GetPagingListOptions } from 'types/base';
import { MatchMetaData } from 'types/match';
import {
  AffiliatedSponsorPayload,
  ChangePasswordPayload,
  CredentialPayload,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  LoginResponse,
  MessageResponse,
  OAuthPayload,
  ResetPasswordPayload,
  SignupPayload,
  SignupResponse,
  UserProfile,
  VerifyPayload,
} from 'types/user';
import auth from 'utils/auth';

import { setIsLoggedIn, setProfile } from '../slice/userSlice';
import { apiSlice, apiWithToastSlice } from './baseApiSlice';
import { urlWithAuthPrefix, urlWithCorePrefix } from './helper';

const userApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, CredentialPayload>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/login'),
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setProfile(data.user));
        dispatch(setIsLoggedIn(true));
        auth.setToken(data.accessToken, data.refreshToken);
      },
    }),
    loginGoogle: build.mutation<LoginResponse, OAuthPayload>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/login/google'),
        method: 'POST',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setProfile(data.user));
        dispatch(setIsLoggedIn(true));
        auth.setToken(data.accessToken, data.refreshToken);
      },
    }),
    signup: build.mutation<SignupResponse, SignupPayload>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/signup'),
        method: 'POST',
        body,
      }),
    }),
    verify: build.mutation<MessageResponse, VerifyPayload>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/verify'),
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: build.mutation<ForgotPasswordResponse, ForgotPasswordPayload>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/forgot-password'),
        method: 'POST',
        body,
      }),
    }),
    resetPassword: build.mutation<MessageResponse, ResetPasswordPayload>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/reset-password'),
        method: 'POST',
        body,
      }),
    }),
    changePassword: build.mutation<MessageResponse, ChangePasswordPayload>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/change-password'),
        method: 'POST',
        body,
      }),
    }),
    editProfile: build.mutation<UserProfile, Partial<UserProfile>>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/edit-profile'),
        method: 'PATCH',
        body,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setProfile(data));
      },
    }),
    getProfile: build.query<UserProfile, void>({
      query: () => urlWithCorePrefix('users/me'),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;

        dispatch(setProfile(data));
      },
    }),
    affiliateSponsor: build.mutation<void, AffiliatedSponsorPayload>({
      query: (body) => ({
        url: 'users/affiliate-sponsor',
        method: 'POST',
        body,
      }),
    }),
    getRefereeMatches: build.query<
      GetListResult<MatchMetaData>,
      GetPagingListOptions & {
        status?: MatchState;
      }
    >({
      query: ({ page, take, status }) => ({
        url: urlWithCorePrefix('users/referee/match'),
        params: {
          page,
          take,
          status,
        },
      }),
    }),
  }),
});

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<MessageResponse, void>({
      query: (body) => ({
        url: urlWithAuthPrefix('auth/logout'),
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginGoogleMutation,
  useSignupMutation,
  useVerifyMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useEditProfileMutation,
  useLazyGetProfileQuery,
  useAffiliateSponsorMutation,
  useGetRefereeMatchesQuery,
  useLazyGetRefereeMatchesQuery,
} = userApiToastSlice;

export const { useLogoutMutation } = userApiSlice;
