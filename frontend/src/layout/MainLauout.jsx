import { NavLink, Outlet } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <>
      <nav className="navbar">

        <div className="nav-links">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>

          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>

          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
          
          <NavLink to="/Profile" className="nav-link">
            profile
          </NavLink>
        </div>
      </nav>

      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;