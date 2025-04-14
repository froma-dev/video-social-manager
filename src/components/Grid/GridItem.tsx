import { classNamesBuilder } from "@utils/utils";
import CarouselItem, {
  CarouselItemProps,
} from "@components/Carousel/CarouselItem";
import "./GridItem.css";

interface GridItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  style?: React.CSSProperties;
  className?: string;
}

interface GridItemProps {
  data: GridItem | CarouselItemProps;
  type: "grid" | "carousel";
}

const GridItem = ({ data, type }: GridItemProps) => {
  const classNames = classNamesBuilder("grid__item", className);
  return (
    <div className={classNames} style={style}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default CarouselItem;
export { type GridItemProps };
