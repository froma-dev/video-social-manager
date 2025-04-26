import {
  IconEye,
  IconHeart,
  IconMessage,
  TablerIcon,
  IconInfoCircle,
} from "@tabler/icons-react";

type IconComponentMap = "viewCount" | "likeCount" | "commentCount";
interface StatTagProps {
  id?: string;
  icon: IconComponentMap;
  labelText: string;
  labelClassName?: string;
  iconClassName?: string;
}

const iconComponentMap: Record<IconComponentMap, TablerIcon> = {
  viewCount: IconEye,
  likeCount: IconHeart,
  commentCount: IconMessage,
};
const StatTag = ({ icon, labelText }: StatTagProps) => {
  const IconComponent = iconComponentMap[icon] ?? IconInfoCircle;

  return (
    <div className="flex items-center gap-2">
      <IconComponent className="text-zinc-400" />
      <p className="text-zinc-50 text-md">{labelText}</p>
    </div>
  );
};
export default StatTag;

export type { IconComponentMap, StatTagProps };
