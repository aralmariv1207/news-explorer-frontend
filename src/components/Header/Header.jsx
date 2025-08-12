import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, currentUser, onLogout, onSignInClick }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  const headerThemeClass = isSavedNewsPage
    ? "header_theme_light"
    : "header_theme_dark";
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
        className={`header__logo ${headerThemeClass}`}
        onClick={closeMobileMenu}
      >
        NewsExplorer
      </Link>

      <div
        className={`header__menu-icon ${
          isMobileMenuOpen ? "header__menu-icon_close" : ""
        } ${headerThemeClass}`}
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
                `navigation__link ${headerThemeClass} ${
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
                  `navigation__link ${headerThemeClass} ${
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
                className={`navigation__signin-button ${headerThemeClass}`}
                onClick={handleSignIn}
              >
                Sign in
              </button>
            ) : (
              <button
                type="button"
                className={`navigation__button_user ${headerThemeClass}`}
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
