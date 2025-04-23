import { useCallback, useEffect, useState } from "react";

type AuthorizationCode = string | null;
const useOAuth2 = () => {
  const [authorizationCode, setAuthorizationCode] =
    useState<AuthorizationCode>(null);

  const handleTokenExtraction = useCallback(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newAuthorizationCode = searchParams.get("code");

    if (newAuthorizationCode) {
      setAuthorizationCode(newAuthorizationCode);
    }
  }, []);

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

        handleTokenChange(accessToken);
      } catch (error) {
        console.error("Error exchanging token:", error);
      }
    },
    [handleTokenChange]
  );

  useEffect(() => {
    handleTokenExtraction();
  }, [handleTokenExtraction]);

  return [authorizationCode];
};

export default useOAuth2;
