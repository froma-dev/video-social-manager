import { useCallback, useEffect } from "react";
import {
  requestGoogleAuthorization,
  extractAccessToken,
} from "@features/auth/services/oauth2";
import { setAccessTokenData } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { hasAccessTokenData } from "../types";

const useOAuth2 = () => {
  const dispatch = useDispatch();
  const requestAuthorization = useCallback(
    () => requestGoogleAuthorization(),
    []
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

  return requestAuthorization;
};

export default useOAuth2;
