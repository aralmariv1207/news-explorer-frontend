import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, currentUser, onLogout, onSignInClick }) {
  const location = useLocation();
  const isMainPage = location.pathname === "/"; // Determine if on main page

  return (
    <header
      className={`header ${
        isMainPage ? "header_theme_dark" : "header_theme_light"
      }`}
    >
      <Link to="/" className="header__logo">
        NewsExplorer
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={onLogout}
        onSignInClick={onSignInClick}
        isMainPage={isMainPage} // Pass isMainPage to Navigation for link styling
      />
    </header>
  );
}

export default Header;
