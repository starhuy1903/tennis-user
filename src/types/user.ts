import { MemberRole } from 'constants/group';
import { Gender } from 'constants/tournament';
import { UserRole } from 'constants/user';

export type LoginPayload = {
  email: string;
  password: string;
};

export type OAuthPayload = {
  token: string;
};

export type SignupPayload = LoginPayload & {
  name: string;
  gender: Gender;
  dob: string;
  phoneNumber: string;
};

export type VerifyPayload = {
  verifyToken: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  newPassword: string;
  verifyToken: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
};

export type MessageResponse = {
  statusCode?: number;
  message?: string;
};

export type SignupResponse = MessageResponse & {
  verificationLink?: string;
};

export type ForgotPasswordResponse = SignupResponse;

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  image: string;
  dob: string;
  phoneNumber: string;
  gender: Gender;
  role: UserRole;
  elo: number | null;
  isReferee: boolean;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AffiliatedSponsorPayload = {
  companyName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  website: string;
  taxNumber: string;
  description: string;
};

export type MemberUser = {
  id: string;
  email: string;
  name: string;
  image?: string;
  bio?: string;
};

export type MemberDto = {
  userId: string;
  groupId: number;
  createdAt: string;
  updatedAt: string;
  role: MemberRole;
  user: MemberUser;
};
