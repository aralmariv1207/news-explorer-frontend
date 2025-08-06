import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <h1 className="navigation__logo">NewsExplorer</h1>
      <div className="navigation__menu">
        <Link to="/" className="navigation__link">
          Home
        </Link>
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
