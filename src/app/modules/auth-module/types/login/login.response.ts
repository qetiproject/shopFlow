export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface AuthUser {
  userId: number;
  emailId: string;
}

export interface LoginResponse {
  message: string;
  result: boolean;
  data: AuthUser & AuthTokens;
}
