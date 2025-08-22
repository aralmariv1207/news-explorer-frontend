import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ isLoggedIn, currentUser, onLogout, onSignInClick }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const headerThemeClass = isSavedNewsPage
    ? "header_theme_light"
    : "header_theme_dark";
  const logoThemeClass = isSavedNewsPage
    ? "header__logo_theme_light"
    : "header__logo_theme_dark";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoutAndCloseMenu = () => {
    onLogout();
    closeMobileMenu();
  };

  const handleSignInAndCloseMenu = () => {
    onSignInClick();
    closeMobileMenu();
  };

  const headerElementsMobileOpenClass = isMobileMenuOpen
    ? "header__element_mobile-open"
    : "";

  return (
    <header
      className={`header ${headerThemeClass} ${
        isMobileMenuOpen ? "header_mobile-menu-open" : ""
      }`}
    >
      <Link
        to="/"
        className={`header__logo ${logoThemeClass} ${headerElementsMobileOpenClass}`}
        onClick={closeMobileMenu}
      >
        NewsExplorer
      </Link>

      <button
        type="button"
        className={`header__menu-icon ${
          isMobileMenuOpen ? "header__menu-icon_close" : ""
        } ${headerElementsMobileOpenClass}`}
        onClick={handleToggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
      >
        <span className="header__menu-icon-line"></span>
        <span className="header__menu-icon-line"></span>
      </button>

      {isMobileMenuOpen && (
        <div className="header__mobile-overlay" onClick={closeMobileMenu}>
          <nav
            className="navigation_mobile-open"
            onClick={(e) => e.stopPropagation()}
          >
            <Navigation
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogout={handleLogoutAndCloseMenu}
              onSignInClick={handleSignInAndCloseMenu}
              isMobile={true}
              closeMobileMenu={closeMobileMenu}
              isSavedNewsPage={isSavedNewsPage}
            />
          </nav>
        </div>
      )}

      <nav className="navigation_desktop">
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={onLogout}
          onSignInClick={onSignInClick}
          isMobile={false}
          isSavedNewsPage={isSavedNewsPage}
        />
      </nav>
    </header>
  );
}

export default Header;
