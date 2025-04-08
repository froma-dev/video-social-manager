import "./Grid.css";
import { classNamesBuilder } from "../../utils/utils";

interface GridProps {
  children: React.ReactNode;
  auto?: boolean;
  onDragStart?: (event: React.DragEvent) => void;
  onDragEnd?: (event: React.DragEvent) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDrop?: (event: React.DragEvent) => void;
  onDragEnter?: (event: React.DragEvent) => void;
  onDragLeave?: (event: React.DragEvent) => void;
  dragging?: boolean;
}

const Grid = ({
  children,
  auto = false,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onDragEnter,
  onDragLeave,
  dragging = false,
}: GridProps) => {
  const gridClassName = classNamesBuilder("grid", {
    auto,
    dragging,
  });

  return (
    <section
      className={gridClassName}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {children}
    </section>
  );
};

export default Grid;
export type { GridProps };
