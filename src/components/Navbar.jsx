import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="side-navbar">
      <NavLink to="/">Inbox</NavLink>
      <NavLink to="/spam">Spam</NavLink>
      <NavLink to="/trash">Trash</NavLink>
    </div>
  );
};

export default Navbar;
