import Pill from "@components/Pill/Pill";
import { IconCalendarEvent } from "@tabler/icons-react";
import Button from "@components/Button/Button";

const iconMap = {
  calendarEvent: IconCalendarEvent,
};
interface FilterData {
  text: string;
  filter: string | number;
  icon?: string;
}

interface FilterProps {
  filterData: FilterData;
  onFilterChange: (filter: string | number) => void;
  isSelected?: boolean;
}
const Filter = ({ filterData, onFilterChange, isSelected }: FilterProps) => {
  const { filter, text, icon } = filterData;
  const Icon = iconMap[icon as keyof typeof iconMap];
  return (
    <Button
      styled="filter"
      onClick={() => onFilterChange(filter)}
      className={isSelected ? "bg-zinc-800" : ""}
    >
      <Pill className={isSelected ? "bg-zinc-800 font-medium" : ""}>
        {icon ? <Icon /> : null}
        <span>{text}</span>
      </Pill>
    </Button>
  );
};

export default Filter;
export type { FilterProps, FilterData };
