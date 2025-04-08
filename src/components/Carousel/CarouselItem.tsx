import { classNamesBuilder } from "../../utils/utils";
import "./CarouselItem.css";

interface CarouselItemProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  style?: React.CSSProperties;
  className?: string;
}

const CarouselItem = ({
  title,
  description,
  image,
  style,
  className = "",
}: CarouselItemProps) => {
  const classNames = classNamesBuilder("carousel__item", className);
  return (
    <div className={classNames} style={style}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default CarouselItem;
export { type CarouselItemProps };
