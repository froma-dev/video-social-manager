import Button from "../Button/Button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "../Navigator/BasicNavigator.css";

type Direction = "previous" | "next";
interface BasicNavigatorProps {
  onClick: (dir: Direction) => void;
  onKeyDown: (dir: Direction) => void;
}
const NEXT: Direction = "next";
const PREVIOUS: Direction = "previous";

const BasicNavigator = ({ onClick, onKeyDown }: BasicNavigatorProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === "ArrowLeft") {
      onKeyDown(PREVIOUS);
    } else if (event.code === "ArrowRight") {
      onKeyDown(NEXT);
    }
  };

  return (
    <nav className="basic__navigator">
      <div className="basic__nav">
        <Button
          className="basic__nav__button"
          onKeyDown={handleKeyDown}
          onClick={() => onClick(PREVIOUS)}
        >
          <IconChevronLeft size={48} />
        </Button>
        <Button
          className="basic__nav__button"
          onKeyDown={handleKeyDown}
          onClick={() => onClick(NEXT)}
        >
          <IconChevronRight size={48} />
        </Button>
      </div>
    </nav>
  );
};

export default BasicNavigator;
export { type Direction, type BasicNavigatorProps };
