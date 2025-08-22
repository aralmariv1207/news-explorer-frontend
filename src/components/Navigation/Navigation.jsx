import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import logoutIconWhite from "../../assets/images/logout_icon_white.svg";
import logoutIconBlack from "../../assets/images/logout_icon_black.svg";

function Navigation({
  isLoggedIn,
  currentUser,
  onLogout,
  onSignInClick,
  isMobile,
  closeMobileMenu,
  isSavedNewsPage,
}) {
  const location = useLocation();
  const currentPath = location.pathname;

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

  if (isMobile) {
    return (
      <ul className="navigation__menu navigation__menu_mobile">
        <li>
          <Link
            to="/"
            className={`navigation__link ${
              currentPath === "/" ? "navigation__link_active" : ""
            }`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link
              to="/saved-news"
              className={`navigation__link ${
                currentPath === "/saved-news" ? "navigation__link_active" : ""
              }`}
              onClick={closeMobileMenu}
            >
              Saved articles
            </Link>
          </li>
        )}
        <li>
          {isLoggedIn ? (
            <button
              type="button"
              className={`navigation__button_user_mobile`}
              onClick={onLogout}
            >
              {currentUser?.name || "User"}
              <img
                src={logoutIconWhite}
                alt="Logout"
                className={`navigation__logout-icon ${logoutIconThemeClass}`}
              />
            </button>
          ) : (
            <button
              type="button"
              className={`navigation__signin-button_mobile`}
              onClick={onSignInClick}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
    );
  }

  return (
    <ul className="navigation__menu navigation__menu_desktop">
      <li>
        <Link
          to="/"
          className={`navigation__link ${navLinkThemeClass} ${
            currentPath === "/" ? "navigation__link_active" : ""
          }`}
        >
          Home
        </Link>
      </li>
      {isLoggedIn && (
        <li>
          <Link
            to="/saved-news"
            className={`navigation__link ${navLinkThemeClass} ${
              currentPath === "/saved-news" ? "navigation__link_active" : ""
            }`}
          >
            Saved articles
          </Link>
        </li>
      )}
      <li>
        {isLoggedIn ? (
          <button
            type="button"
            className={`navigation__button_user_desktop ${userButtonThemeClass}`}
            onClick={onLogout}
          >
            {currentUser?.name || "User"}
            <img
              src={isSavedNewsPage ? logoutIconBlack : logoutIconWhite}
              alt="Logout"
              className={`navigation__logout-icon ${logoutIconThemeClass}`}
            />
          </button>
        ) : (
          <button
            type="button"
            className={`navigation__signin-button_desktop ${signInButtonThemeClass}`}
            onClick={onSignInClick}
          >
            Sign in
          </button>
        )}
      </li>
    </ul>
  );
}

export default Navigation;
