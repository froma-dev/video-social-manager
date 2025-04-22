import { useCallback, useEffect } from "react";
import "./Auth.css";
import {
  YOUTUBE_DATA_API_CLIENT_ID,
  YOUTUBE_DATA_API_CLIENT_SECRET,
  YOUTUBE_DATA_API_REDIRECT_URI,
} from "@/config";
import { useState } from "react";

interface AuthProps {
  handleTokenChange: (token: string) => void;
}

const YoutubeScopes = [
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/yt-analytics-monetary.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
];

const Auth = ({ handleTokenChange }: AuthProps) => {
  const [accessToken, setAccessToken] = useState(null);
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  const oauth2TokenEndpoint = "https://oauth2.googleapis.com/token";
  const clientId = YOUTUBE_DATA_API_CLIENT_ID;
  const clientSecret = YOUTUBE_DATA_API_CLIENT_SECRET;
  const redirectUri = YOUTUBE_DATA_API_REDIRECT_URI;

  // Parameters to pass to OAuth 2.0 endpoint.
  const params = {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "token",
    scope: YoutubeScopes.join(" "),
    include_granted_scopes: "true",
    state: "pass-through value",
  };

  async function handleOAuthSignIn(event: React.FormEvent) {
    event.preventDefault();

    const oauth2AuthorizationUrl = new URL(oauth2Endpoint);
    const oauth2AuthorizationParams = new URLSearchParams(params);

    oauth2AuthorizationUrl.search = oauth2AuthorizationParams.toString();

    // redirect
    window.location.href = oauth2AuthorizationUrl.toString();
  }

  const handleTokenExchange = useCallback(
    async (authorizationCode: string) => {
      const requestBody = new URLSearchParams({
        code: authorizationCode,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      });

      try {
        const response = await fetch(oauth2TokenEndpoint, {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          body: requestBody,
        });

        if (!response.ok) {
          throw new Error("Failed to exchange token");
        }

        const data = await response.json();
        const accessToken = data.access_token;

        setAccessToken(accessToken);
        handleTokenChange(accessToken);
        console.log("TOKENEEEEEEEEE", data);
      } catch (error) {
        console.error("Error exchanging token:", error);
      }
    },
    [
      clientId,
      clientSecret,
      redirectUri,
      oauth2TokenEndpoint,
      handleTokenChange,
    ]
  );

  const handleTokenExtraction = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authorizationCode = searchParams.get("code");

    if (authorizationCode) {
      handleTokenExchange(authorizationCode);
    }
  }, [handleTokenExchange]);

  useEffect(() => {
    handleTokenExtraction();
  }, [handleTokenExtraction]);

  return (
    <div className="authentication">
      <div className="row align-items-center">
        <div className="col-md-6 col-12 red-section d-flex justify-content-center align-items-center">
          <h1 className="text-center" style={{ color: "white" }}>
            YouTube Video Search
          </h1>
        </div>
        <div className="mb-4 text-center">
          <p style={{ fontWeight: "600" }}>
            Sign in using Google to authorize this application to access the
            YouTube Data API using your personal Google account.
          </p>
        </div>
        <div>
          {accessToken === null ? (
            <form onSubmit={handleOAuthSignIn} className="text-center">
              <button className="btn btn-primary" type="submit">
                Sign in with Google
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p style={{ fontWeight: "600" }}>You are signed in</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
