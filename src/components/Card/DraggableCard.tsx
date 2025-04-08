import Card, { type CardProps } from "./Card";
import "./DraggableCard.css";
import { useState } from "react";

interface DraggableCardProps extends CardProps {
  draggable?: boolean;
}

const DraggableCard = (props: DraggableCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDropTarget, setIsDropTarget] = useState(false);
  const { id } = props;

  const handleDragEnd = (event: React.DragEvent) => {
    setIsDragging(false);
    setIsDropTarget(false);
  };
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const handleDragEnter = (event: React.DragEvent) => {
    setIsDropTarget(true);
  };
  const handleDragLeave = (event: React.DragEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDropTarget(false);
    }
  };

  // Handle the item to be dragged
  const handleDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData("dragging", id);
    event.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  };
  const handleDrop = (event: React.DragEvent) => {
    setIsDropTarget(false);
  };

  return (
    <Card
      {...props}
      draggable={true}
      isDragging={isDragging}
      isDropTarget={isDropTarget}
      dragEnd={handleDragEnd}
      dragOver={handleDragOver}
      dragEnter={handleDragEnter}
      dragLeave={handleDragLeave}
      dragStart={handleDragStart}
      drop={handleDrop}
    />
  );
};

export default DraggableCard;
export type { DraggableCardProps };
