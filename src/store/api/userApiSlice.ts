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

const userApiToastSlice = apiWithToastSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, CredentialPayload>({
      query: (body) => ({
        url: 'http://localhost:8001/auth/login',
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
        url: 'http://localhost:8001/auth/login/google',
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
        url: 'http://localhost:8001/auth/signup',
        method: 'POST',
        body,
      }),
    }),
    verify: build.mutation<MessageResponse, VerifyPayload>({
      query: (body) => ({
        url: 'http://localhost:8001/auth/verify',
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: build.mutation<ForgotPasswordResponse, ForgotPasswordPayload>({
      query: (body) => ({
        url: 'http://localhost:8001/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: build.mutation<MessageResponse, ResetPasswordPayload>({
      query: (body) => ({
        url: 'http://localhost:8001/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
    changePassword: build.mutation<MessageResponse, ChangePasswordPayload>({
      query: (body) => ({
        url: 'auth/change-password',
        method: 'POST',
        body,
      }),
    }),
    getProfile: build.query<UserProfile, void>({
      query: () => 'users/me',
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
  }),
});

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<MessageResponse, void>({
      query: (body) => ({
        url: 'auth/logout',
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
  useLazyGetProfileQuery,
  useAffiliateSponsorMutation,
} = userApiToastSlice;

export const { useLogoutMutation } = userApiSlice;
