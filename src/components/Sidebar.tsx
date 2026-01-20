import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../utils/navItemsData";

interface SidebarProps {
  onLinkClick?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onLinkClick }) => {
  return (
    <nav className="p-4 space-y-2">
      <h1 className="text-xl font-semibold mb-4 sm:hidden">CMS Menu</h1>

      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onLinkClick}
          className={({ isActive }) =>
            `block rounded px-3 py-2 text-sm font-medium ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
