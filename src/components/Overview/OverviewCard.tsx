import { classNamesBuilder } from "@/utils/utils";
import {
  IconEye,
  IconThumbUp,
  IconTrendingDown,
  IconTrendingUp,
  IconUserPlus,
} from "@tabler/icons-react";
import { OverviewCardData } from "./types";

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
        "card rounded-xl flex flex-col justify-items-center align-items-center text-center p-6 border bg-zinc-950 border-zinc-700",
        className
      )}
    >
      <h2 className="text-4xl font-bold text-zinc-50">{title}</h2>
      <div className="flex items-center justify-center gap-1 w-full">
        <Icon className="text-zinc-200" size={24} />
        <p className="text-zinc-400 text-lg">{description}</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        {trend > 0 ? (
          <>
            <IconTrendingUp className="text-green-400" />
            <p className="text-green-400 text-xl font-semibold">{trend}</p>
          </>
        ) : (
          <>
            <IconTrendingDown className="text-red-400" />
            <p className="text-red-400 text-xl font-semibold">{trend}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default OverviewCard;
export type { OverviewCardData };
