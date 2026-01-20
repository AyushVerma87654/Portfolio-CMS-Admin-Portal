import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CmsDashboard = () => {
  return (
    <div className="relative bg-gray-100">
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden sm:block w-64 bg-white shadow-md">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CmsDashboard;
