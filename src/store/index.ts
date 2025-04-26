import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "@features/search/searchSlice";
import authReducer from "@features/auth/store/authSlice";
import { middlewareManager } from "./middleware";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
  },
  middleware: (getMiddlewares) => getMiddlewares().concat(middlewareManager),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
