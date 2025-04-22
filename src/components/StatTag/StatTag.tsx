import { TablerIcon } from "@tabler/icons-react";

interface StatTagProps {
  label: { text: string; className: string };
  icon: {
    className: string;
    IconComponent: TablerIcon;
  };
}

const StatTag = ({ label, icon }: StatTagProps) => {
  const { IconComponent } = icon;

  return (
    <div className="flex items-center gap-2">
      <IconComponent className={icon.className} />
      <p className={label.className}>{label.text}</p>
    </div>
  );
};
export default StatTag;

//iconClassName = "text-green-600"
//labelClassName = "text-green-600 text-xl font-semibold"
