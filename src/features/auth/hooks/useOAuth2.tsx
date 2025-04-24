import { useCallback, useEffect, useState } from "react";

type AuthorizationCode = string | null;
const useOAuth2 = () => {
  const [authorizationCode, setAuthorizationCode] =
    useState<AuthorizationCode>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newAuthorizationCode = searchParams.get("code");

    if (newAuthorizationCode) {
      setAuthorizationCode(newAuthorizationCode);
    }

    return () => {
      setAuthorizationCode(null);
    };
  }, []);

  return [authorizationCode];
};

export default useOAuth2;
