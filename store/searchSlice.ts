import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchYoutube } from "../services/youtube/youtube.types";
import { AssetProps } from "../components/Asset/Asset";

type provider = "youtube" | "tiktok";


const DEFAULT_PROVIDER: provider = "youtube";
const API_BY_PROVIDER: Record<provider, (apiParams:) => Promise<AssetProps[]>> = {
    youtube: () => searchYoutube({ query, accessToken }),
    //tiktok: () => searchTiktok({ query, accessToken })
}

const fetchSearch = createAsyncThunk("search/fetchSearch", async ({ query, provider }) => {
    let response: AssetProps[] = [];

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
        builder.addCase()
    }
})