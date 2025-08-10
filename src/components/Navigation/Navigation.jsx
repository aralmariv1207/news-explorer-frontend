import React from "react";
import { NavLink } from "react-router-dom"; // Removed useLocation import as it's not directly used for active links here
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  currentUser,
  onLogout,
  onSignInClick,
  isMainPage,
}) {
  // const location = useLocation(); // REMOVED: This line is no longer needed as NavLink's isActive prop is sufficient.

  return (
    <nav className="navigation">
      <div className="navigation__menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navigation__link ${
              isMainPage
                ? "navigation__link_theme_dark"
                : "navigation__link_theme_light"
            } ${isActive ? "navigation__link_active" : ""}`
          }
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              `navigation__link ${
                isMainPage
                  ? "navigation__link_theme_dark"
                  : "navigation__link_theme_light"
              } ${isActive ? "navigation__link_active" : ""}`
            }
          >
            Saved articles
          </NavLink>
        )}
        {isLoggedIn ? (
          <button
            className={`navigation__button_user ${
              isMainPage
                ? "navigation__button_user_theme_dark"
                : "navigation__button_user_theme_light"
            }`}
            onClick={onLogout}
          >
            {currentUser?.name || "User"}
            <span
              className={`navigation__logout-icon ${
                isMainPage
                  ? "navigation__logout-icon_theme_dark"
                  : "navigation__logout-icon_theme_light"
              }`}
            ></span>
          </button>
        ) : (
          <button
            className={`navigation__signin-button ${
              isMainPage
                ? "navigation__signin-button_theme_dark"
                : "navigation__signin-button_theme_light"
            }`}
            onClick={onSignInClick}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
