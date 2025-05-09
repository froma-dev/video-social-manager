import { useCallback, useEffect } from "react";
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
  const revokeAuthorization = useCallback(async () => {
    try {
      const revokeResult = await revokeGoogleAuthorization();

      if (revokeResult) dispatch(clearAccessTokenData());
    } catch (error) {
      console.error("Failed to revoke authorization", error);
    }
  }, [dispatch]);
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

  return { requestAuthorization, revokeAuthorization };
};

export default useOAuth2;
