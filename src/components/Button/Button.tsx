import { classNamesBuilder } from "@utils/utils";
import "./Button.css";

type ButtonType = "primary" | "rate" | "transparent" | "filter";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  className?: string;
  styled?: ButtonType;
}
const ButtonClassNames = {
  primary:
    "rounded-4xl flex items-center justify-center text-gray-800 gap-2 bg-zinc-100 px-4 py-3 active:scale-102 text-zinc-900 hover:bg-zinc-200 hover:scale-102 font-medium transition-transform",
  rate: "rounded-4xl flex items-center justify-center gap-2bg-transparent px-1 py-1 active:scale-102 py-1hover:scale-102 hover:bg-zinc-500 transition-all",
  transparent:
    "rounded-4xl flex items-center justify-center gap-2 bg-transparent px-1 py-1 active:scale-102 py-1hover:scale-102 hover:bg-zinc-800/40 transition-all",
  filter:
    "rounded-4xl flex items-center justify-center gap-2 bg-transparent px-1 py-1 active:scale-102 py-1hover:scale-102 hover:bg-zinc-800/40 transition-all",
};

const Button = ({
  children,
  onClick,
  onKeyDown,
  className = "",
  styled = "primary",
  disabled,
  ...props
}: ButtonProps) => {
  const classNames = classNamesBuilder(
    "button",
    ButtonClassNames[styled],
    className
  );

  return (
    <button
      className={classNames}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
export { type ButtonProps };
