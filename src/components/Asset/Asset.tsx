import { classNamesBuilder } from "../../utils/utils";
import { Link } from "react-router-dom";
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
  id,
  title,
  description,
  image,
  style,
  className = "",
}: AssetProps) => {
  const classNames = classNamesBuilder("asset", className);
  return (
    <Link to={`/details/${id}`}>
      <div className={classNames} style={style}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </Link>
  );
};

export default Asset;
export { type AssetProps };
