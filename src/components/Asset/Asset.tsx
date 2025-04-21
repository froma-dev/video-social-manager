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
  subtitle?: string;
}

const Asset = ({
  id,
  title,
  description,
  image,
  style,
  className = "",
  subtitle,
}: AssetProps) => {
  const classNames = classNamesBuilder(
    `asset flex flex-col gap-4 rounded-md overflow-hidden h-full
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
        <div className="metadata flex flex-col gap-2 h-full">
          <h3 className="font-bold text-md">{title}</h3>
          {subtitle && (
            <p className="text-zinc-400 font-semibold text-sm">{subtitle}</p>
          )}
          {description && <p className="text-zinc-400">{description}</p>}
        </div>
      </section>
    </Link>
  );
};

export default Asset;
export { type AssetProps };
