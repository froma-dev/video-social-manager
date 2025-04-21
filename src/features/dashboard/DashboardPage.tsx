import OverviewCard from "./OverviewCard";
import { shortNumber } from "@/utils/utils";

interface OverviewCardData {
  title: string;
  description: string;
  trend: number;
}
const dashboardTitle = "Channel Overview";
const overviewCardsData: OverviewCardData[] = [
  {
    title: shortNumber(15000),
    description: "Subscribers",
    trend: 150,
  },
  {
    title: shortNumber(10000),
    description: "Total views",
    trend: -5.5,
  },
  {
    title: shortNumber(100000),
    description: "Total likes",
    trend: 100,
  },
];
const recentVideosTitle = "Recent Videos";
const DashboardPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">{dashboardTitle}</h1>
        <div className="flex gap-4">
          {overviewCardsData.map((card) => (
            <OverviewCard
              key={card.description}
              title={card.title}
              description={card.description}
              trend={card.trend}
              className={`basis-1/${overviewCardsData.length}`}
            />
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-2xl font-bold text-white">{recentVideosTitle}</h1>
        <div className="flex gap-4">
            
        </div>
      </section>
    </section>
  );
};

export default DashboardPage;
