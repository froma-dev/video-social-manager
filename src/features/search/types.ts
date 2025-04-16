import {
  SearchYoutubeParams,
  VideoAsset,
} from "@/services/youtube/youtube.types";

type SearchProvider = "youtube" | "tiktok";
type SearchApiParams = SearchYoutubeParams;
type SearchApiProvider = (params: SearchApiParams) => Promise<VideoAsset[]>;
interface FetchSearchParams {
  accessToken: string;
  query: string;
  provider: SearchProvider;
}
type SearchResultsByQuery = Record<string, VideoAsset[]>;
type SearchResultsByProvider = Record<SearchProvider, SearchResultsByQuery>;
interface SearchState {
  results: VideoAsset[];
  resultsByQuery: SearchResultsByQuery;
  resultsByProvider: SearchResultsByProvider;
  query: string;
  provider: SearchProvider;
  loading: boolean;
  typing: boolean;
  error: string | null;
}

export type {
  SearchProvider,
  FetchSearchParams,
  SearchApiProvider,
  SearchState,
};
