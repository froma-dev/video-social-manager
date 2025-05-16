import { Link } from "react-router-dom";

interface AssetProps {
  id: string;
  title: string;
  description?: string;
  image: string;
  style?: React.CSSProperties;
  className?: string;
  subtitle?: string;
}

const Asset = ({ id, title, image, subtitle }: AssetProps) => {
  return (
    <section className="hover:bg-zinc-950 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:scale-101 p-2 transition-all duration-400 rounded-xl max-w-screen-2xl group">
      <Link to={`/details/${id}`}>
        <div className="flex flex-col items-center h-full gap-4">
          <div className="relative overflow-hidden w-full">
            <img
              src={image}
              alt={title}
              className="object-cover h-full w-full aspect-video transition-transform rounded-xl"
            />
            <div className="absolute inset-0 transition-all duration-500 group-hover:bg-transparent bg-zinc-600/50 bg-[linear-gradient(to_right_top,rgba(0,0,0,0.8),rgba(0,0,0,0.3),transparent)] flex items-end p-4 rounded-xl">
              <div className="flex flex-col items-start gap-2 h-full justify-between"></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center p-4 w-full">
            {subtitle ? (
              <p className="text-sm font-semibold text-zinc-400">{subtitle}</p>
            ) : null}
            <h2 className="flex flex-col h-20 text-xl sm:text-md md:text-lg lg:text-md sm:text-center md:text-left lg:text-left tracking-tight font-extrabold text-gray-900 dark:text-zinc-300 group-hover:text-zinc-50 transition-all duration-500 overflow-hidden text-ellipsis line-clamp-3">
              {title}
            </h2>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Asset;
export { type AssetProps };
