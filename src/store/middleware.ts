import { Middleware } from "@reduxjs/toolkit";
import {
  setAccessTokenData,
  clearAccessTokenData,
} from "@features/auth/store/authSlice";
import { authStorageMiddleware } from "@features/auth/store/authStorageMiddleware";

export const middlewareManager: Middleware =
  (storeAPI) => (next) => (action) => {
    let result;
    const isAuthAction =
      setAccessTokenData.match(action) || clearAccessTokenData.match(action);

    if (isAuthAction) {
      result = authStorageMiddleware(storeAPI)(next)(action);
    } else {
      result = next(action);
    }
    return result;
  };
