export interface RequestAccessTokenProps {
  authorizationCode: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  oauth2TokenEndpoint: string;
}
export interface RequestAccessTokenPayload {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  error?: string;
}
export interface AccessTokenData {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  scope: string;
}
export interface AccessTokenDataError {
  error: string;
}
export type AccessTokenResult = AccessTokenData | AccessTokenDataError;
export interface RequestGoogleAccessTokenProps {
  authorizationCode: string;
}

export const hasAccessTokenData = (data: AccessTokenResult): data is AccessTokenData => {
  return 'accessToken' in data;
};
