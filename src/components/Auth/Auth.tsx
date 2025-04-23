import { useCallback, useEffect } from "react";
import {
  YOUTUBE_DATA_API_CLIENT_ID,
  YOUTUBE_DATA_API_CLIENT_SECRET,
  YOUTUBE_DATA_API_REDIRECT_URI,
} from "@/config";
import Button from "@components/Button/Button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

interface AuthProps {
  handleTokenChange: (token: string) => void;
}

const youtubeScopes = [
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
];
const youtubeOAuth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
const youtubeOAuth2TokenEndpoint = "https://oauth2.googleapis.com/token";
const clientId = YOUTUBE_DATA_API_CLIENT_ID;
const clientSecret = YOUTUBE_DATA_API_CLIENT_SECRET;
const redirectUri = YOUTUBE_DATA_API_REDIRECT_URI;
const oauth2Endpoint = youtubeOAuth2Endpoint;
const oauth2TokenEndpoint = youtubeOAuth2TokenEndpoint;
const oAuth2SearchParams = {
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: "code",
  scope: youtubeScopes.join(" "),
  include_granted_scopes: "true",
  state: "pass-through value",
};

const Auth = ({ handleTokenChange }: AuthProps) => {
  async function handleOAuthSignIn(event: React.FormEvent) {
    event.preventDefault();
    const oauth2AuthorizationUrl = new URL(oauth2Endpoint);
    oauth2AuthorizationUrl.search = new URLSearchParams(
      oAuth2SearchParams
    ).toString();
    window.location.href = oauth2AuthorizationUrl.toString();
  };

  return (
    <div className="authentication grid place-items-center h-dvh">
      <section className="login flex flex-col items-center border border-slate-700 rounded-xl p-6">
        <div className="mb-4 text-center">
          <h1 className="text-4xl font-bold text-center">
            Social Video Manager
          </h1>
          <p className="text-lg">
            Sign in using Google to authorize this application to access the
            YouTube Data API using your personal Google account.
          </p>
        </div>
        <form onSubmit={handleOAuthSignIn} className="text-center">
          <Button>
            <IconBrandGoogleFilled size={24} />
            Sign in with Google
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Auth;
