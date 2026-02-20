import {NavLink , Outlet} from "react-router-dom";

const MainLayout = ()=>{
  return(
      <>
      <nav>
        <NavLink to={"/"} end>home</NavLink>
        <NavLink to={"/login"} end>login</NavLink>
        <NavLink to={"/signup"}>signup</NavLink>
        </nav>
        <Outlet />
    </>
  )
}

export default MainLayout;