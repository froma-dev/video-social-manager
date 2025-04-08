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
  const classNames = classNamesBuilder("button", className);

  return (
    <button className={classNames} onClick={onClick} onKeyDown={onKeyDown}>
      {children}
    </button>
  );
};

export default Button;
