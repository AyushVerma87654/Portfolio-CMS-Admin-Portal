import { FC, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "../redux/store";
import {
  isLoggedInSelector,
  isSideBarOpenSelector,
  userSelector,
} from "../redux/selectors/userSelector";
import Button from "./Button";
import {
  fetchMeInitiatedAction,
  logoutInitiatedAction,
  toggleIsSideBarOpenAction,
} from "../redux/slice/userSlice";
import { HiMenu } from "react-icons/hi";
import { navItems } from "../utils/navItemsData";

interface NavBarProps extends ReduxProps {}

const NavBar: FC<NavBarProps> = ({
  user,
  isLoggedIn,
  initiateLogout,
  fetchProfile,
  isSideBarOpen,
  toggleIsSideBarOpen,
}) => {
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-teal-700 via-blue-800 to-indigo-900 shadow-md">
      <div className="mx-auto p-4 flex justify-between items-center gap-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => toggleIsSideBarOpen()}
            className="sm:hidden cursor-pointer text-orange-500"
          >
            <HiMenu size={28} />
          </div>
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-orange-500"
          >
            Portfolio CMS
          </Link>
        </div>

        {/* Right */}
        {isLoggedIn ? (
          <div className="sm:hidden rounded-full bg-blue-500 text-rose-700 min-w-9! min-h-9! flex items-center justify-center text-xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <Link to="/login">
            <Button className="bg-orange-500 text-white px-3 py-1.5 sm:hidden">
              Login
            </Button>
          </Link>
        )}
        <div className="hidden sm:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="rounded-full bg-blue-500 text-rose-700 w-9 h-9 flex items-center justify-center text-xl font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <Button
                onClick={() => initiateLogout()}
                className="bg-orange-500 text-white px-3 py-1.5 text-sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button className="bg-orange-500 text-white px-3 py-1.5">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
      {isSideBarOpen && (
        <nav className="space-y-2 sm:hidden bg-white w-40 absolute p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => toggleIsSideBarOpen()}
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
          <div
            onClick={() => toggleIsSideBarOpen()}
            className="block rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Close
          </div>
        </nav>
      )}
    </nav>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  isLoggedIn: isLoggedInSelector(state),
  isSideBarOpen: isSideBarOpenSelector(state),
});

const mapDispatchToProps = {
  initiateLogout: logoutInitiatedAction,
  fetchProfile: fetchMeInitiatedAction,
  toggleIsSideBarOpen: toggleIsSideBarOpenAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NavBar);
