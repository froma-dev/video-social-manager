import {
  getLocalStorageWithExpiry,
  LocalStorageKey,
} from "@utils/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccessTokenData } from "@features/auth/types";

const accessTokenKey = "access_token_data" as LocalStorageKey;
const StoredAccessTokenData =
  getLocalStorageWithExpiry<AccessTokenData>(accessTokenKey);
console.log("StoredAccessTokenData", StoredAccessTokenData);

const initialState: AccessTokenData = {
  accessToken: StoredAccessTokenData?.accessToken ?? null,
  refreshToken: StoredAccessTokenData?.refreshToken ?? null,
  expiresIn: StoredAccessTokenData?.expiresIn ?? 0,
  scope: StoredAccessTokenData?.scope ?? "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessTokenData: (state, action: PayloadAction<AccessTokenData>) => {
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
