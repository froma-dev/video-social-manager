import StatTag from "./StatTag";
import { StatTagProps } from "@components/StatTag/StatTag";

const StatTagList = ({
  statTagListData,
}: {
  statTagListData: StatTagProps[];
}) => {
  return (
    <div className="statistics flex gap-2">
      {statTagListData.map((stat) => (
        <StatTag
          key={stat.id}
          labelText={stat.labelText}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatTagList;
