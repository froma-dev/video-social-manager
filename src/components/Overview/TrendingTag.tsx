import { classNamesBuilder } from "@utils/utils";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

type Trend = "up" | "down";

const iconMap = {
  up: IconTrendingUp,
  down: IconTrendingDown,
};

const classNameMap = {
  up: "text-green-500",
  down: "text-red-500",
};

const TrendingTag = ({ value, trend }: { value: number; trend: Trend }) => {
  const Icon = iconMap[trend];
  return (
    <div
      className={classNamesBuilder(
        "flex items-center gap-1 rounded-md py-0.5 px-1",
        classNameMap[trend]
      )}
    >
      <Icon className="text-inherit" size={18} />
      <p className="text-inherit text-sm font-semibold">{value}</p>
      <span className="text-xs text-zinc-400">vs 7 days</span>
    </div>
  );
};

export default TrendingTag;
