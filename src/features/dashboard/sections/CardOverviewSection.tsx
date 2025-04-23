import OverviewCard, { type OverviewCardData } from "@components/Overview/OverviewCard";

const CardOverviewSection = ({
  title,
  overviewCardsData,
}: {
  title: string;
  overviewCardsData: OverviewCardData[];
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <div className="flex gap-4">
        {overviewCardsData.map((card) => (
          <OverviewCard
            key={card.id}
            title={card.title}
            description={card.description}
            trend={card.trend}
            className={`basis-1/${overviewCardsData.length}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CardOverviewSection;
