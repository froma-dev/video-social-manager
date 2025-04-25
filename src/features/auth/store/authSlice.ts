import {
  getLocalStorageWithExpiry,
} from "@utils/localStorage";
import { createSlice, Middleware } from "@reduxjs/toolkit";
import { AccessTokenData } from "@features/auth/types";

const StoredAccessTokenData =
  getLocalStorageWithExpiry<AccessTokenData>("access_token_data");

const initialState: AccessTokenData = {
  accessToken: StoredAccessTokenData?.accessToken ?? null,
  refreshToken: StoredAccessTokenData?.refreshToken ?? null,
  expiresIn: StoredAccessTokenData?.expiresIn ?? 0,
  scope: StoredAccessTokenData?.scope ?? "",
};

const accessTokenStorageMiddleware: Middleware = storeAPI => next => action => {
    
  
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessTokenData: (state, action) => {
      const { accessToken, refreshToken, expiresIn, scope } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresIn = expiresIn;
      state.scope = scope;
    },
    clearAccessTokenData: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = 0;
      state.scope = "";
    },
  },
});

export const { setAccessTokenData, clearAccessTokenData } = authSlice.actions;
export default authSlice.reducer;
