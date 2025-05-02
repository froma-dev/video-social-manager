import OverviewCard, {
  type OverviewCardData,
} from "@components/Overview/OverviewCard";

const CardOverviewSection = ({
  title,
  overviewCardsData,
}: {
  title: string;
  overviewCardsData: OverviewCardData[];
}) => {
  return (
    <section className="flex max-w-screen-xl flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <div className="grid w-full gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
