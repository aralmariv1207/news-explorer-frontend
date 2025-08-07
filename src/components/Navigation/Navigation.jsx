import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <h1 className="navigation__logo">NewsExplorer</h1>
      <div className="navigation__menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "navigation__link navigation__link_active"
              : "navigation__link"
          }
        >
          Home
        </NavLink>
        <button
          className="navigation__signin-button"
          onClick={() => console.log("Sign in clicked")}
        >
          Sign in
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
