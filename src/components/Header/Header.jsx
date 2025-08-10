import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, currentUser, onLogout, onSignInClick }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  // headerThemeClass will be 'header_theme_light' for saved-news, 'header_theme_dark' for home
  const headerThemeClass = isSavedNewsPage
    ? "header_theme_light"
    : "header_theme_dark";
  const logoThemeClass = isSavedNewsPage
    ? "header__logo_theme_light"
    : "header__logo_theme_dark";
  // navLinkThemeClass will apply dark or light link styles
  const navLinkThemeClass = isSavedNewsPage
    ? "navigation__link_theme_light"
    : "navigation__link_theme_dark";
  const signInButtonThemeClass = isSavedNewsPage
    ? "navigation__signin-button_theme_light"
    : "navigation__signin-button_theme_dark";
  const userButtonThemeClass = isSavedNewsPage
    ? "navigation__button_user_theme_light"
    : "navigation__button_user_theme_dark";
  // Theme-specific class for logout icon (uses dedicated white/black SVGs)
  const logoutIconThemeClass = isSavedNewsPage
    ? "navigation__logout-icon_theme_black"
    : "navigation__logout-icon_theme_white";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuIconClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    closeMobileMenu();
  };

  const handleSignIn = () => {
    onSignInClick();
    closeMobileMenu();
  };

  return (
    <header
      className={`header ${headerThemeClass} ${
        isMobileMenuOpen ? "header_mobile-menu-open" : ""
      }`}
    >
      <Link
        to="/"
        className={`header__logo ${logoThemeClass}`}
        onClick={closeMobileMenu}
      >
        NewsExplorer
      </Link>

      <div
        className={`header__menu-icon ${
          isMobileMenuOpen ? "header__menu-icon_close" : ""
        }`}
        onClick={handleMenuIconClick}
      ></div>

      {isMobileMenuOpen && (
        <div className="header__mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <nav
        className={`navigation ${isMobileMenuOpen ? "navigation_open" : ""}`}
      >
        <ul className="navigation__menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${navLinkThemeClass} ${
                  isActive ? "navigation__link_active" : ""
                }`
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink
                to="/saved-news"
                className={({ isActive }) =>
                  `${navLinkThemeClass} ${
                    isActive ? "navigation__link_active" : ""
                  }`
                }
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
                className={`navigation__signin-button ${signInButtonThemeClass}`}
                onClick={handleSignIn}
              >
                Sign in
              </button>
            ) : (
              <button
                type="button"
                className={`navigation__button_user ${userButtonThemeClass}`}
                onClick={handleLogoutClick}
              >
                {currentUser?.name || "User"}
                <span
                  className={`navigation__logout-icon ${logoutIconThemeClass}`}
                ></span>
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
