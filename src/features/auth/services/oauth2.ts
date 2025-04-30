import {
  GOOGLE_OAUTH2_ENDPOINT,
  GOOGLE_OAUTH2_TOKEN_ENDPOINT,
  YOUTUBE_DATA_API_CLIENT_ID,
  YOUTUBE_DATA_API_CLIENT_SECRET,
  YOUTUBE_DATA_API_REDIRECT_URI,
} from "@/config";
import { buildErrorMessage } from "@utils/utils";
import {
  AccessTokenResult,
  AccessTokenData,
  AccessTokenDataError,
  RequestAccessTokenProps,
  RequestAccessTokenPayload,
  RequestGoogleAccessTokenProps,
  hasAccessTokenData,
} from "@features/auth/types";
import { setAccessTokenData } from "../store/authSlice";

const youtubeScopes = [
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
];

export const requestAccessToken = async ({
  authorizationCode,
  clientId,
  clientSecret,
  redirectUri,
  oauth2TokenEndpoint,
}: RequestAccessTokenProps): Promise<AccessTokenResult> => {
  try {
    const response = await fetch(oauth2TokenEndpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: authorizationCode,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!response.ok) {
      throw new Error(response.status.toString());
    }

    const responseData: RequestAccessTokenPayload = await response.json();
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken,
      scope,
      error,
    } = responseData;

    if (error) throw new Error(error);

    return {
      accessToken,
      expiresIn: expiresIn * 1000, // use milliseconds
      refreshToken,
      scope,
    } as AccessTokenData;
  } catch (err) {
    const error = buildErrorMessage("Failed to exchange token", err);
    console.error(error);
    return { error } as AccessTokenDataError;
  }
};

export const extractAccessToken = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const authorizationCode = searchParams.get("code");

  if (authorizationCode) {
    return requestGoogleAccessToken({ authorizationCode });
  }
  return Promise.resolve(null);
};

export const requestGoogleAccessToken = async ({
  authorizationCode,
}: RequestGoogleAccessTokenProps) => {
  const accessTokenData = await requestAccessToken({
    authorizationCode,
    clientId: YOUTUBE_DATA_API_CLIENT_ID,
    clientSecret: YOUTUBE_DATA_API_CLIENT_SECRET,
    redirectUri: YOUTUBE_DATA_API_REDIRECT_URI,
    oauth2TokenEndpoint: GOOGLE_OAUTH2_TOKEN_ENDPOINT,
  });
  return accessTokenData;
};

export const requestGoogleAuthorization = () => {
  const oauth2AuthorizationUrl = new URL(GOOGLE_OAUTH2_ENDPOINT);
  oauth2AuthorizationUrl.search = new URLSearchParams({
    client_id: YOUTUBE_DATA_API_CLIENT_ID,
    redirect_uri: YOUTUBE_DATA_API_REDIRECT_URI,
    response_type: "code",
    scope: youtubeScopes.join(" "),
    include_granted_scopes: "true",
    state: "pass-through value",
  }).toString();
  window.location.href = oauth2AuthorizationUrl.toString();
};
