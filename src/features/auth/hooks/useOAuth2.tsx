import { useCallback, useEffect, useState } from "react";
import {
  requestGoogleAuthorization,
  extractAccessToken,
  revokeGoogleAuthorization,
} from "@features/auth/services/oauth2";
import { clearAccessTokenData, setAccessTokenData } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { hasAccessTokenData } from "../types";

const useOAuth2 = () => {
  const dispatch = useDispatch();
  const requestAuthorization = useCallback(
    () => requestGoogleAuthorization(),
    []
  );
  const [isRevoking, setIsRevoking] = useState(false);
  const revokeAuthorization = useCallback(
    async (accessToken: string) => {
      try {
        setIsRevoking(true);
        const revokeResult = await revokeGoogleAuthorization({
          accessToken,
        });

        if (revokeResult) dispatch(clearAccessTokenData());
      } catch (error) {
        console.error("Failed to revoke authorization", error);
      } finally {
        setIsRevoking(false);
      }
    },
    [dispatch]
  );
  const extractAccessTokenData = useCallback(async () => {
    const accessTokenData = await extractAccessToken();

    if (accessTokenData && hasAccessTokenData(accessTokenData)) {
      dispatch(setAccessTokenData(accessTokenData));
    } else {
      console.error("Failed to extract access token");
    }
  }, [dispatch]);

  useEffect(() => {
    extractAccessTokenData();
  }, [extractAccessTokenData]);

  return { requestAuthorization, revokeAuthorization, isRevoking };
};

export default useOAuth2;
