import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  currentUser,
  onLogout,
  onSignInClick,
  isMainPage,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navigation">
      {/* Existing desktop navigation */}
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

      {/* NEW: Mobile burger menu */}
      <div className="navigation__mobile">
        <button
          className={`navigation__burger-menu ${
            isMobileMenuOpen ? "navigation__burger-menu_open" : ""
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navigation__burger-line"></span>
          <span className="navigation__burger-line"></span>
        </button>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="navigation__mobile-overlay">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink
                to="/saved-news"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Saved articles
              </NavLink>
            )}
            {isLoggedIn ? (
              <button onClick={onLogout}>{currentUser?.name || "User"}</button>
            ) : (
              <button onClick={onSignInClick}>Sign in</button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
