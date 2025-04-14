import { useState } from "react";
import Grid, { type GridProps } from "./Grid";
import "./DraggableGrid.css";
import DraggableCard, {
  type DraggableCardProps,
} from "@components/Card/DraggableCard";
import { delay } from "@utils/utils";

interface DraggableGridProps extends Omit<GridProps, "children"> {
  data: DraggableCardProps[];
}

const DraggableGrid = ({ data, auto = false }: DraggableGridProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDroppingId, setIsDroppingId] = useState<string | null>(null);
  const [gridData, setGridData] = useState(data);

  const handleDragStart = (event: React.DragEvent) => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: React.DragEvent) => {
    setIsDragging(false);
  };

  const handleDrop = async (event: React.DragEvent) => {
    const draggedTargetId = event.dataTransfer.getData("dragging");
    const dropTarget = (event.target as HTMLElement).closest<HTMLElement>(
      ".card"
    );
    const dropTargetId = dropTarget?.dataset.id;

    if (dropTargetId === draggedTargetId) return;

    const dropTargetIndex = gridData.findIndex(
      (gridItem) => gridItem.id === dropTargetId
    );

    if (draggedTargetId && dropTargetId) {
      const draggedTargetData = gridData.find(
        (gridItem) => gridItem.id === draggedTargetId
      );

      const newGridData = gridData.filter(
        (gridItem) => gridItem.id !== draggedTargetId
      );

      if (draggedTargetData) {
        newGridData.splice(dropTargetIndex, 0, draggedTargetData);

        await delay(100);
        setGridData(newGridData);
        await delay(100);
        setIsDroppingId(draggedTargetId);
        await delay(1000);
        setIsDroppingId(null);
      }
    }
  };

  return (
    <Grid
      auto={auto}
      dragging={isDragging}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      {gridData.map((card) => (
        <DraggableCard
          key={card.id}
          id={card.id}
          title={`${card.title} ${card.id}`}
          description={`${card.description}`}
          isDropping={isDroppingId === card.id}
        />
      ))}
    </Grid>
  );
};

export default DraggableGrid;
