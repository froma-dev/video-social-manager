import { Link } from "react-router-dom";
import { IconGraph, IconHome, IconSearch } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

const menuItems = [
  {
    path: "/",
    icon: <IconHome size={40} stroke={1} className="text-zinc-300" />,
    label: "Home",
  },
  {
    path: "/dashboard",
    icon: <IconGraph size={40} stroke={1} className="text-inherit" />,
    label: "Dashboard",
  },
  {
    path: "/search",
    icon: <IconSearch size={40} stroke={1} className="text-inherit" />,
    label: "Search",
  },
];

const Menu = () => {
  const location = useLocation();

  return (
    <nav className="row-start-1 row-span-1 md:row-start-2 md:row-span-5 md:col-span-1 p-4 border-r border-zinc-700">
      <ul className="flex flex-col items-end sm:items-start gap-2">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={
              location.pathname === item.path
                ? "text-blue-500 hover:text-blue-600 transition-colors"
                : "text-zinc-300 hover:text-zinc-400 transition-colors"
            }
          >
            <Link to={item.path} className="flex items-center gap-2">
              {item.icon}
              <span className="text-inherit text-lg font-medium">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
