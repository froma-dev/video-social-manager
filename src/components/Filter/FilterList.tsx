import Filter, { type FilterData } from "./Filter";

interface FilterListProps {
  filterData: FilterData[];
  onFilterChange: (filter: string | number) => void;
  selectedFilter: string | number;
}
const FilterList = ({ filterData, onFilterChange, selectedFilter }: FilterListProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="statistics flex flex-row justify-center md:justify-start gap-2 flex-wrap">
        {filterData.map((filter) => (
          <Filter
            key={filter.filter}
            filterData={filter}
            isSelected={filter.filter === selectedFilter}
            onFilterChange={onFilterChange}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterList;
export type { FilterListProps, FilterData };
