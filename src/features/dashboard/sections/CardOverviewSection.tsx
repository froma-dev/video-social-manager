import OverviewCard, {
  type OverviewCardData,
} from "@components/Overview/OverviewCard";
import FilterList, {
  type FilterListProps,
} from "@components/Filter/FilterList";

const CardOverviewSection = ({
  title,
  overviewCardsData,
  onFilterChange,
  filterList,
  selectedFilter,
}: {
  title: string;
  overviewCardsData: OverviewCardData[];
  onFilterChange: FilterListProps["onFilterChange"];
  filterList: FilterListProps["filterData"];
  selectedFilter: FilterListProps["selectedFilter"];
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <FilterList
        filterData={filterList}
        selectedFilter={selectedFilter}
        onFilterChange={onFilterChange}
      />
      <div className="grid w-full gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCardsData.map((card) => (
          <OverviewCard
            key={card.id}
            title={card.title}
            description={card.description}
            trend={card.trend}
            icon={card.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default CardOverviewSection;
