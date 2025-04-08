import Button from "../Button/Button";
import "./Card.css";
import { classNamesBuilder } from "../../utils/utils";

interface CardProps {
  id: string;
  title: string;
  description: string;
  draggable?: boolean;
  isDragging?: boolean;
  isDropping?: boolean;
  isDropTarget?: boolean;
  dragEnd?: (event: React.DragEvent) => void;
  dragOver?: (event: React.DragEvent) => void;
  dragEnter?: (event: React.DragEvent) => void;
  dragLeave?: (event: React.DragEvent) => void;
  dragStart?: (event: React.DragEvent) => void;
  drop?: (event: React.DragEvent) => void;
}

const Card = ({
  title,
  description,
  draggable = false,
  dragEnd,
  dragOver,
  dragEnter,
  dragLeave,
  dragStart,
  drop,
  isDragging = false,
  isDropTarget = false,
  isDropping = false,
  id,
}: CardProps) => {
  const cardClassName = classNamesBuilder(
    "card",
    { dragging: isDragging },
    { "drop-target": isDropTarget },
    { dropping: isDropping },
    { draggable: draggable }
  );
  return (
    <article
      className={cardClassName}
      draggable={draggable}
      onDragEnd={dragEnd}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragStart={dragStart}
      onDrop={drop}
      data-id={id}
    >
      <h2 className="card__title">{title}</h2>
      <p className="card__description">{description}</p>
      <Button>Button</Button>
    </article>
  );
};

export default Card;
export type { CardProps };
