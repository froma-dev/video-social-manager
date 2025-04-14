import "./Card.css";
import { classNamesBuilder } from "@utils/utils";

interface CardProps {
  id: string;
  title: string;
  subtitle?: string;
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
  children?: React.ReactNode;
}

const Card = ({
  title,
  subtitle,
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
  children,
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
      className="card rounded-2xl bg-zinc-950 flex flex-col justify-items-start"
      draggable={draggable}
      onDragEnd={dragEnd}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragStart={dragStart}
      onDrop={drop}
      data-id={id}
    >
      <section className="card__header flex flex-col gap-2">
        <h2 className="text-2xl text-left font-extrabold">{title}</h2>
        {subtitle ? <h3 className="text-base text-left">{subtitle}</h3> : null}
      </section>
      {description ? <p className="card__description">{description}</p> : null}
      {children ? children : null}
    </article>
  );
};

export default Card;
export type { CardProps };
