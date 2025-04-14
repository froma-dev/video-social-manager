import { classNamesBuilder } from "@utils/utils";
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
  const classNames = classNamesBuilder(
    `asset flex flex-col gap-4 rounded-md overflow-hidden h-full
    border-1 border-zinc-800
    hover:scale-105 transition-all hover:bg-zinc-700`,
    className
  );
  return (
    <Link to={`/details/${id}`}>
      <section className={classNames} style={style}>
        <img
          src={image}
          alt={title}
          className="rounded-md aspect-[4/3] object-cover w-full h-full"
        />
        <div className="h-full">
          <h3 className="font-bold h-full">{title}</h3>
        </div>
      </section>
    </Link>
  );
};

export default Asset;
export { type AssetProps };
