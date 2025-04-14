import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchYoutube } from "@services/youtube/youtube";
import { type VideoAsset, type SearchYoutubeParams } from "@services/youtube/youtube.types";

type provider = "youtube" | "tiktok";
type SearchApiParams = SearchYoutubeParams
type APIProviderSearch = (params: SearchApiParams) => Promise<VideoAsset[]>;
interface FetchSearchParams {
    query: string;
    provider: provider;
}

const DEFAULT_PROVIDER: provider = "youtube";
const API_BY_PROVIDER: Record<provider, APIProviderSearch> = {
    youtube: (params) => searchYoutube({ ...params }),
    tiktok: () => {
        throw new Error("Tiktok provider not implemented");
    }
}

const fetchSearch = createAsyncThunk("search/fetchSearch", async ({ query, provider }: FetchSearchParams) => {
    const api = API_BY_PROVIDER[provider];

    if (!api) {
        throw new Error("Invalid provider");
    }

    try {
        const response = await api({ query, accessToken: "" });

        return response
    } catch (error) {
        console.error("Failed to fetch search results:", error);
    }

})

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        resultsByQuery: {},
        resultsByProvider: {
            youtube: {},
            tiktok: {}
        },
        query: "",
        provider: DEFAULT_PROVIDER,
        loading: false,
        error: null
    },
    reducers: {
        setProvider: (state, action) => {
            state.provider = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setSearchResults: (state, action) => {
            state.loading = false;
            state.resultsByQuery = action.payload;
        },
        clearSearch: (state) => {
            state.loading = false;
            state.error = null;
            state.query = "";
            state.resultsByQuery = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearch.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSearch.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(fetchSearch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})