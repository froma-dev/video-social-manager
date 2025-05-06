import { classNamesBuilder } from "@utils/utils";

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

const Pill = ({ text, children, ...props }: PillProps) => {
  const { className = "" } = props;

  return (
    <div
      className={classNamesBuilder(
        "flex rounded-4xl border-zinc-700 border px-[16px] py-[8px] gap-2",
        className
      )}
    >
      {children}
      {text}
    </div>
  );
};

export default Pill;
