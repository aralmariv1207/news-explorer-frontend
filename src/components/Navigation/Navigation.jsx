import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  currentUser,
  onLogout,
  onSignInClick,
  isMobile, // Controls rendering for mobile vs. desktop
  closeMobileMenu, // Function to close the mobile menu (passed from Header)
  isSavedNewsPage, // Prop to determine theme
}) {
  const navLinkThemeClass = isSavedNewsPage
    ? "navigation__link_theme_light"
    : "navigation__link_theme_dark";
  const signInButtonThemeClass = isSavedNewsPage
    ? "navigation__signin-button_theme_light"
    : "navigation__signin-button_theme_dark";
  const userButtonThemeClass = isSavedNewsPage
    ? "navigation__button_user_theme_light"
    : "navigation__button_user_theme_dark";
  const logoutIconThemeClass = isSavedNewsPage
    ? "navigation__logout-icon_theme_black"
    : "navigation__logout-icon_theme_white";

  // Helper to get active class for NavLink, considering theme
  const getNavLinkClassName = ({ isActive }) =>
    `${navLinkThemeClass} ${isActive ? "navigation__link_active" : ""}`;

  if (isMobile) {
    return (
      <ul className="navigation__menu navigation__menu_mobile">
        <li>
          <NavLink
            to="/"
            className={getNavLinkClassName}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink
              to="/saved-news"
              className={getNavLinkClassName}
              onClick={closeMobileMenu}
            >
              Saved articles
            </NavLink>
          </li>
        )}
        <li>
          {!isLoggedIn ? (
            <button
              type="button"
              className={`navigation__signin-button navigation__signin-button_mobile ${signInButtonThemeClass}`}
              onClick={onSignInClick}
            >
              Sign in
            </button>
          ) : (
            <button
              type="button"
              className={`navigation__button_user navigation__button_user_mobile ${userButtonThemeClass}`}
              onClick={onLogout}
            >
              {currentUser?.name || "User"}
              <span
                className={`navigation__logout-icon ${logoutIconThemeClass}`}
              ></span>
            </button>
          )}
        </li>
      </ul>
    );
  }

  return (
    <ul className="navigation__menu navigation__menu_desktop">
      <li>
        <NavLink to="/" className={getNavLinkClassName}>
          Home
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/saved-news" className={getNavLinkClassName}>
            Saved articles
          </NavLink>
        </li>
      )}
      <li>
        {!isLoggedIn ? (
          <button
            type="button"
            className={`navigation__signin-button navigation__signin-button_desktop ${signInButtonThemeClass}`}
            onClick={onSignInClick}
          >
            Sign in
          </button>
        ) : (
          <button
            type="button"
            className={`navigation__button_user navigation__button_user_desktop ${userButtonThemeClass}`}
            onClick={onLogout}
          >
            {currentUser?.name || "User"}
            <span
              className={`navigation__logout-icon ${logoutIconThemeClass}`}
            ></span>
          </button>
        )}
      </li>
    </ul>
  );
}

export default Navigation;
