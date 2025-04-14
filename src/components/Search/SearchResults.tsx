import Asset, { type AssetProps } from "@components/Asset/Asset";
import Grid from "@components/Grid/Grid";

interface SearchResultsProps {
  searchResults: AssetProps[];
}

const SearchResults = ({ searchResults }: SearchResultsProps) => {
  return (
    <div className="search-results">
      {searchResults.length > 0 ? (
        <Grid>
          {searchResults.map((searchResultsItem) => (
            <Asset key={searchResultsItem.id} {...searchResultsItem}></Asset>
          ))}
        </Grid>
      ) : (
        <p>No results ☹️</p>
      )}
    </div>
  );
};

export default SearchResults;
