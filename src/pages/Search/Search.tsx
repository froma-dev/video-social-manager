import { useState, useEffect, useMemo } from "react";
import { searchYoutube } from "@services/youtube/youtube";
import { debounceAsync } from "@utils/utils";
import SearchResults from "@components/Search/SearchResults";
import { AssetProps } from "@components/Asset/Asset";
import { useSelector } from "react-redux";

interface SearchProps {
  accessToken: string;
}
const MIN_QUERY_LENGTH = 3;

const Search = ({ accessToken }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<AssetProps[]>([]);
  //
  const query = useSelector<string>((state) => state.search.query)

  const debouncedSearch = useMemo(() => {
    return debounceAsync(async (query: string) => {
      const videos = await searchYoutube({ query, accessToken });
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
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Search YouTube Videos</h1>
        <input
          className="w-full rounded-md border-2 border-zinc-700 outline-emerald-800 p-3 flex-2/3 text-2xl"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
        />
      </div>
      {searching ? (
        <p>Searching...</p>
      ) : (
        query.length >= MIN_QUERY_LENGTH && (
          <SearchResults searchResults={searchResults} />
        )
      )}
    </section>
  );
};

export default Search;
