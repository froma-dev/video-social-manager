import { classNamesBuilder } from "../../utils/utils";
import { type ButtonProps } from "../Button/Button";

interface RateButtonProps extends ButtonProps {
}

const RateButton = ({
  children,
  onClick,
  onKeyDown,
  className = "",
}: RateButtonProps) => {
  const classNames = classNamesBuilder(
    "button rounded-4xl flex items-center gap-2 bg-gray-100 px-4 py-3 active:scale-102 transition-transform",
    className
  );

  return (
    <button className={classNames} onClick={onClick} onKeyDown={onKeyDown}>
      {children}
    </button>
  );
};

export default RateButton;
export { type RateButtonProps };
