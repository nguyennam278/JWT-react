import React, { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
const Nav = () => {
  const location = useLocation();
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsShow(false);
    }
  });
  return (
    <>
      {isShow === true && (
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Project</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      )}
    </>
  );
};

export default Nav;
