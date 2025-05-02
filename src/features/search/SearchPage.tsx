import { useEffect, useMemo } from "react";
import { debounceAsync } from "@utils/utils";
import { AssetProps } from "@components/Asset/Asset";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import SearchResults from "@components/Search/SearchResults";
import { setQuery, fetchSearch, setSearchResults } from "./searchSlice";
import useOAuth2Context from "../auth/hooks/useOAuth2Context";
import Spinner from "@/components/Spinner/Spinner";

const MIN_QUERY_LENGTH = 3;
const DEFAULT_SEARCH_DEBOUNCE = 1000;

const SearchPage = () => {
  const { accessToken } = useOAuth2Context();
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const searchProvider = useSelector(
    (state: RootState) => state.search.provider
  );
  const cachedResults = useSelector(
    (state: RootState) => state.search.resultsByQuery?.[searchQuery]
  );
  const searchResults = useSelector((state: RootState) => state.search.results);
  const searchLoading = useSelector((state: RootState) => state.search.loading);
  const searchTyping = useSelector((state: RootState) => state.search.typing);
  const searchError = useSelector((state: RootState) => state.search.error);

  const debouncedSearch = useMemo(() => {
    return debounceAsync(async (query: string) => {
      dispatch(
        fetchSearch({
          query,
          provider: searchProvider,
          accessToken,
        })
      );
    }, DEFAULT_SEARCH_DEBOUNCE);
  }, [accessToken, dispatch, searchProvider]);

  // Search
  useEffect(() => {
    if (searchQuery.length < MIN_QUERY_LENGTH) return;

    if (cachedResults) {
      console.log("from cached results", cachedResults);
      dispatch(setSearchResults(cachedResults));
      return;
    }

    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch, cachedResults, dispatch]);

  const searchResultAssets = useMemo(() => {
    return searchResults.map(
      (video) =>
        ({
          id: video.id,
          title: video.title,
          subtitle: video.channelTitle,
          image: video.thumbnails.high.url,
        } as AssetProps)
    );
  }, [searchResults]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("will dispatch ", e.target.value);
    dispatch(setQuery(e.target.value));
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Search YouTube Videos</h1>
        <input
          className="w-full rounded-md border-2 border-zinc-700 outline-emerald-800 p-3 flex-2/3 text-2xl"
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Enter search query"
        />
      </div>
      {searchLoading ? (
        <Spinner title="Searching" />
      ) : (
        searchQuery.length >= MIN_QUERY_LENGTH &&
        !searchTyping && (
          <SearchResults
            searchResults={searchResultAssets}
            error={searchError}
          />
        )
      )}
    </section>
  );
};

export default SearchPage;
