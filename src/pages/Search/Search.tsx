import { useState, useEffect, useMemo } from "react";
import { searchVideos } from "../../services/youtube/youtube";
import { debounceAsync } from "../../utils/utils";
import SearchResults from "../../components/Search/SearchResults";
import { AssetProps } from "../../components/Asset/Asset";

interface SearchProps {
  accessToken: string;
}
const MIN_QUERY_LENGTH = 3;

const Search = ({ accessToken }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AssetProps[]>([]);

  const debouncedSearch = useMemo(() => {
    return debounceAsync(async (query: string) => {
      const videos = await searchVideos({query, accessToken});
      const carouselItems = videos.map((video) => {
        return {
          id: video.id,
          title: video.title,
          image: video.thumbnails.high.url,
        } as AssetProps;
      });

      setSearchResults(carouselItems);
      setSearching(false);
    }, 500);
  }, []);

  // Search
  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) return;

    setSearching(true);
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div>
      <h1>Search YouTube Videos</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      {searching ? (
        <p>Searching...</p>
      ) : (
        query.length >= MIN_QUERY_LENGTH && (
          <SearchResults searchResults={searchResults} />
        )
      )}
    </div>
  );
};

export default Search;
