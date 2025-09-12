import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import closeIcon from "../../assets/images/close_icon.svg";
import "./Header.css";

function Header({
  isLoggedIn,
  currentUser,
  onLogout,
  onSignInClick,
  isAnyModalOpen,
}) {
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

  return (
    <header
      className={`header ${headerThemeClass} ${
        isMobileMenuOpen ? "header_mobile-menu-open" : ""
      }`}
    >
      {/* This logo is for the main header, outside the overlay */}
      <Link
        to="/"
        className={`header__logo ${logoThemeClass}`}
        onClick={closeMobileMenu}
      >
        NewsExplorer
      </Link>

      {!isAnyModalOpen && (
        <button
          type="button"
          className={`header__menu-icon ${
            isMobileMenuOpen ? "header__menu-icon_close" : ""
          }`}
          onClick={handleToggleMobileMenu}
          aria-label={
            isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
          }
        >
          <span className="header__menu-icon-line"></span>
          <span className="header__menu-icon-line"></span>
        </button>
      )}

      {isMobileMenuOpen && (
        <div className="header__mobile-overlay" onClick={closeMobileMenu}>
          {/* NEW: Container for the logo and close button within the overlay */}
          <div
            // className={`header__mobile-overlay-header ${headerThemeClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* The logo for the mobile overlay */}
            {/* <Link to="/" className={`header__logo ${logoThemeClass}`}>
              NewsExplorer
            </Link> */}
            {/* The dedicated close button */}
            <button
              className="header__menu-icon header__menu-icon_close"
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <img src={closeIcon} alt="Close" />
            </button>
          </div>
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
