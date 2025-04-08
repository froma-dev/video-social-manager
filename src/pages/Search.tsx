import { useState, useEffect, useMemo } from "react";
import { searchVideos } from "../services/youtube/youtube";
import Carousel, {
  type CarouselItemProps,
} from "../components/Carousel/Carousel";
import { debounceAsync } from "../utils/utils";

interface SearchProps {
  accessToken: string;
}
const MIN_QUERY_LENGTH = 3;

const Search = ({ accessToken }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<CarouselItemProps[]>([]);

  const debouncedSearch = useMemo(() => {
    return debounceAsync(async (query: string) => {
      const videos = await searchVideos(query);
      const carouselItems = videos.map((video) => {
        return {
          id: video.id,
          title: video.title,
          image: video.thumbnails.high.url,
        } as CarouselItemProps;
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
      <h1>Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query"
      />
      {searching ? (
        <p>Searching...</p>
      ) : searchResults.length > 0 ? (
        <Carousel data={searchResults} />
      ) : (
        <p>No results ☹️</p>
      )}
    </div>
  );
};

export default Search;

/* <ul>
          {searchResults.map((video) => (
            <li key={video.id}>
              <img src={video.thumbnails.default.url} alt={video.title} />
              <h2>{video.title}</h2>
              <p>{video.description}</p>
            </li>
          ))}
        </ul> */
