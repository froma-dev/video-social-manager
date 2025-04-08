import { classNamesBuilder } from "../../utils/utils";
import "./Asset.css";

interface AssetProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  style?: React.CSSProperties;
  className?: string;
}

const Asset = ({
  title,
  description,
  image,
  style,
  className = "",
}: AssetProps) => {
  const classNames = classNamesBuilder("asset", className);
  return (
    <div className={classNames} style={style}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Asset;
export { type AssetProps };