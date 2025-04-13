import { type ButtonProps } from "../Button/Button";

const RateButton = ({
  children,
  onClick,
  onKeyDown,
  className = "",
}: ButtonProps) => {
  return (
    <button
      className="button rounded-4xl flex items-center gap-2 bg-transparent px-1 py-1 active:scale-102 py-1hover:scale-102 hover:bg-zinc-500 transition-all"
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
};

export default RateButton;