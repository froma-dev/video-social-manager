import { useCallback, useEffect } from "react";
import {
  requestGoogleAccessToken,
  requestGoogleAuthorization,
} from "@features/auth/services/oauth2";
import { hasAccessTokenData } from "@features/auth/types";
import { setAccessToken } from "../store/authSlice";
import { useDispatch } from "react-redux";

const useOAuth2 = () => {
  const dispatch = useDispatch();
  const requestAuthorization = useCallback(
    () => requestGoogleAuthorization(),
    []
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const authorizationCode = searchParams.get("code");

    if (authorizationCode) {
      console.log("requesting access token");

      requestGoogleAccessToken({ authorizationCode }).then(
        (accessTokenData) => {
          if (hasAccessTokenData(accessTokenData)) {
            const { accessToken } = accessTokenData;
            dispatch(setAccessToken({ accessToken }));
          } else {
            console.error(accessTokenData.error);
          }
        }
      );
    }
  }, [dispatch]);

  return requestAuthorization;
};

export default useOAuth2;
