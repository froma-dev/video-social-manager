import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchYoutube } from "@services/youtube/youtube";
import { type VideoAsset } from "@services/youtube/youtube.types";
import {
  type SearchProvider,
  type FetchSearchParams,
  type SearchApiProvider,
  type SearchState,
} from "./types";

const DEFAULT_PROVIDER: SearchProvider = "youtube";
const API_BY_PROVIDER: Record<SearchProvider, SearchApiProvider> = {
  youtube: (params) => searchYoutube({ ...params }),
  tiktok: () => {
    throw new Error("Tiktok provider not implemented");
  },
};

const fetchSearch = createAsyncThunk<
  VideoAsset[] | undefined,
  FetchSearchParams
>(
  "search/fetchSearch",
  async ({ query, provider, accessToken }: FetchSearchParams) => {
    const searchApi = API_BY_PROVIDER[provider];
    if (!searchApi) throw new Error("Invalid provider");

    try {
      const response = await searchApi({ query, accessToken });
      return response;
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    resultsByQuery: {},
    resultsByProvider: {
      youtube: {},
      tiktok: {},
    },
    query: "",
    provider: DEFAULT_PROVIDER,
    loading: false,
    typing: false,
    error: null,
  } as SearchState,
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setQuery: (state, action) => {
      const query = action.payload;
      const cachedResults = state.resultsByQuery[state.query];

      console.log("setQuery::cachedResults? ", cachedResults);
      state.query = query;
      state.typing = true;
    },
    setSearchResults: (state, action) => {
      state.loading = false;
      state.typing = false;
      state.results = action.payload;
      state.resultsByQuery[state.query] = action.payload;
      state.resultsByProvider[state.provider][state.query] = action.payload;
    },
    clearSearchResults: (state) => {
      state.results = [];
    },
    clearSearch: (state) => {
      state.loading = false;
      state.typing = false;
      state.error = null;
      state.query = "";
      /* state.resultsByQuery = {};
            state.resultsByProvider = {
                youtube: {},
                tiktok: {},
            }; */
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.loading = true;
      state.typing = false;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      const payload = action.payload || [];
      state.loading = false;
      state.results = payload;
      state.resultsByQuery[state.query] = payload;
      state.resultsByProvider[state.provider][state.query] = payload;
    });
    builder.addCase(fetchSearch.rejected, (state, action) => {
      const error = action.error.message || "Failed to fetch search results";
      state.loading = false;
      state.error = error;
    });
  },
});

export default searchSlice.reducer;
export { fetchSearch };
export const {
  setProvider,
  setQuery,
  setSearchResults,
  clearSearch,
  clearSearchResults,
} = searchSlice.actions;
