import { useState, useEffect, useMemo } from "react";
import { searchVideos } from "../services/youtube/youtube";
import Carousel, {
  type CarouselItemProps,
} from "../components/Carousel/Carousel";
import { debounceAsync } from "../utils/utils";
import Grid from "../components/Grid/Grid";
import CarouselItem from "../components/Carousel/CarouselItem";

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
        <>
          <Grid>
            {searchResults.map((searchResultsItem) => {
              return (
                <CarouselItem
                  key={searchResultsItem.id}
                  {...searchResultsItem}
                ></CarouselItem>
              );
            })}
          </Grid>
        </>
      ) : (
        <p>No results ☹️</p>
      )}
    </div>
  );
};

export default Search;
