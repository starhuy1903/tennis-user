export type CredentialPayload = {
  email: string;
  password: string;
};

export type OAuthPayload = {
  token: string;
};

export type SignupPayload = CredentialPayload & {
  confirmPassword: string;
  name: string;
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
  confirmPassword: string;
};

export type LogoutPayload = {
  tokenId: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenId: string;
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
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
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
