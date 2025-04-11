import { classNamesBuilder } from "../../utils/utils";
import "./Button.css";

type ButtonType = "primary" | "rate";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  className?: string;
  type?: ButtonType;
}
const ButtonClassNames = {
  primary:
    "rounded-4xl flex items-center gap-2 bg-gray-100 px-4 py-3 active:scale-102 transition-transform",
  rate: "rounded-4xl flex items-center gap-2bg-transparent px-1 py-1 active:scale-102 py-1hover:scale-102 hover:bg-gray-500 transition-all",
};

const Button = ({
  children,
  onClick,
  onKeyDown,
  className = "",
  type = "primary",
}: ButtonProps) => {
  const classNames = classNamesBuilder(
    "button",
    ButtonClassNames[type],
    className
  );

  return (
    <button className={classNames} onClick={onClick} onKeyDown={onKeyDown}>
      {children}
    </button>
  );
};

export default Button;
export { type ButtonProps };
