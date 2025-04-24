import {
  YOUTUBE_DATA_API_CLIENT_ID,
  YOUTUBE_DATA_API_CLIENT_SECRET,
  YOUTUBE_DATA_API_REDIRECT_URI,
} from "@/config";

const youtubeScopes = [
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
];
const googleOAuth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
const googleOAuth2TokenEndpoint = "https://oauth2.googleapis.com/token";
const clientSecret = YOUTUBE_DATA_API_CLIENT_SECRET;
const googleOAuth2SearchParams = {
  client_id: YOUTUBE_DATA_API_CLIENT_ID,
  redirect_uri: YOUTUBE_DATA_API_REDIRECT_URI,
  response_type: "code",
  scope: youtubeScopes.join(" "),
  include_granted_scopes: "true",
  state: "pass-through value",
};

interface RequestAccessTokenProps {
  authorizationCode: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  oauth2TokenEndpoint: string;
}
interface RequestAccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  error?: string;
}

export const requestAccessToken = async ({
  authorizationCode,
  clientId,
  clientSecret,
  redirectUri,
  oauth2TokenEndpoint,
}: RequestAccessTokenProps) => {
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

    if (!response.ok) throw new Error("Failed to exchange token");

    const responseData: RequestAccessTokenResponse = await response.json();
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken,
      scope,
      error,
    } = responseData;

    if (error) throw new Error(error);

    return { accessToken, expiresIn, refreshToken, scope, error };
  } catch (error) {
    console.error("Error exchanging token:", error);

    return { error };
  }
};

export const requestGoogleAuthorization = () => {
  const oauth2AuthorizationUrl = new URL(googleOAuth2Endpoint);
  oauth2AuthorizationUrl.search = new URLSearchParams(
    googleOAuth2SearchParams
  ).toString();
  window.location.href = oauth2AuthorizationUrl.toString();
};
