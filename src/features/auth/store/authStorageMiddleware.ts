import { removeLocalStorage } from "@/utils/localStorage";
import { Middleware } from "@reduxjs/toolkit";
import { setAccessTokenData, clearAccessTokenData } from "./authSlice";
import { setLocalStorageWithExpiry } from "@utils/localStorage";
import { LocalStorageKey } from "@utils/localStorage";
import { AccessTokenData } from "@features/auth/types";

const accessTokenKey = "access_token_data" as LocalStorageKey;

export const authStorageMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    const result = next(action);
    console.log("result", result);
    if (setAccessTokenData.match(action)) {
      const { expiresIn } = action.payload;

      setLocalStorageWithExpiry<AccessTokenData>(
        accessTokenKey,
        { ...action.payload },
        expiresIn
      );
    }

    if (clearAccessTokenData.match(action)) {
      removeLocalStorage(accessTokenKey);
    }
    return result;
  };
