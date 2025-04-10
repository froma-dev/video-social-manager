import { classNamesBuilder } from "../../utils/utils";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  className?: string;
}

const Button = ({
  children,
  onClick,
  onKeyDown,
  className = "",
}: ButtonProps) => {
  const classNames = classNamesBuilder(
    "button rounded-4xl flex items-center gap-2 bg-gray-100 px-[16px] py-[12px] active:scale-102 transition-transform",
    className
  );

  return (
    <button className={classNames} onClick={onClick} onKeyDown={onKeyDown}>
      {children}
    </button>
  );
};

export default Button;
