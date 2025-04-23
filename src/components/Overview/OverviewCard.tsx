import { classNamesBuilder } from "@/utils/utils";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { OverviewCardData } from "./types";

const OverviewCard = ({
  title,
  description,
  trend,
  className = "",
}: {
  title: string;
  description: string;
  trend: number;
  className?: string;
}) => {
  return (
    <section
      className={classNamesBuilder(
        "card rounded-xl  flex flex-col justify-items-center align-items-center text-center p-6 border border-slate-700",
        className
      )}
    >
      <h2 className="text-6xl font-bold text-white">{title}</h2>
      <p className="text-zinc-400 text-md">{description}</p>
      <div className="flex items-center justify-center gap-2">
        {trend > 0 ? (
          <>
            <IconTrendingUp className="text-green-600" />
            <p className="text-green-600 text-xl font-semibold">{trend}</p>
          </>
        ) : (
          <>
            <IconTrendingDown className="text-red-600" />
            <p className="text-red-600 text-xl font-semibold">{trend}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default OverviewCard;
export type {OverviewCardData}
