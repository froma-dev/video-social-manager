import { classNamesBuilder } from "@/utils/utils";
import {
  IconEye,
  IconThumbUp,
  IconTrendingDown,
  IconTrendingUp,
  IconUserPlus,
} from "@tabler/icons-react";
import { OverviewCardData } from "./types";
import TrendingTag from "./TrendingTag";

const iconMap = {
  subscribers: IconUserPlus,
  trendUp: IconTrendingUp,
  trendDown: IconTrendingDown,
  views: IconEye,
  likes: IconThumbUp,
};
const OverviewCard = ({
  title,
  description,
  trend,
  className = "",
  icon,
}: {
  title: string;
  description: string;
  trend: number;
  className?: string;
  icon?: string;
}) => {
  const Icon = iconMap[icon as keyof typeof iconMap] || IconUserPlus;

  return (
    <section
      className={classNamesBuilder(
        "card rounded-xl h-50 flex flex-col justify-items-center align-items-center justify-center text-center p-6 border bg-zinc-950 border-zinc-700",
        className
      )}
    >
      <header className="flex items-center justify-center gap-2">
        <h2 className="text-5xl font-bold text-zinc-50">{title}</h2>
        <Icon className="text-zinc-300 shrink-0" size={32} />
      </header>
      <div className="flex items-center justify-center gap-1 w-full">
        <p className="text-zinc-400 text-lg font-medium">{description}</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        {<TrendingTag value={trend} trend={`${trend >= 0 ? "up" : "down"}`} />}
      </div>
    </section>
  );
};

export default OverviewCard;
export type { OverviewCardData };
