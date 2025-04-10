interface PillProps {
  text?: string;
  children?: React.ReactNode;
}

const Pill = ({ text, children }: PillProps) => {
  return (
    <div className="flex rounded-4xl border border-gray-700 px-[16px] py-[8px] gap-2">
      {children && children}
      {text}
    </div>
  );
};

export default Pill;
