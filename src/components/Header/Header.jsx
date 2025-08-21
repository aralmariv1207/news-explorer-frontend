import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation"; // Re-import the Navigation component
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

  // Function to toggle the mobile menu state
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handlers for navigation actions, ensuring mobile menu closes
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
      <Link
        to="/"
        className={`header__logo ${logoThemeClass}`}
        onClick={closeMobileMenu}
      >
        NewsExplorer
      </Link>

      {/* The Burger Menu Icon - controlled by Header's state */}
      <button
        type="button"
        className={`header__menu-icon ${headerThemeClass} ${
          isMobileMenuOpen ? "header__menu-icon_close" : ""
        }`}
        onClick={handleToggleMobileMenu}
        aria-label="Open mobile menu"
      >
        <span className="header__menu-icon-line"></span> {/* Line 1 */}
        <span className="header__menu-icon-line"></span> {/* Line 2 */}
      </button>

      {/* Mobile Overlay Backdrop - conditionally rendered */}
      {isMobileMenuOpen && (
        <div className="header__mobile-overlay" onClick={closeMobileMenu}>
          {/* Mobile Navigation Content inside the overlay */}
          <nav
            className="navigation navigation_mobile-open"
            onClick={(e) => e.stopPropagation()}
          >
            <Navigation
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogout={handleLogoutAndCloseMenu} // Use handlers that close the menu
              onSignInClick={handleSignInAndCloseMenu} // Use handlers that close the menu
              isMobile={true} // Indicate this Navigation is for the mobile view
              closeMobileMenu={closeMobileMenu} // Pass close function
              isSavedNewsPage={isSavedNewsPage} // Pass theme info
            />
          </nav>
        </div>
      )}

      {/* Desktop/Tablet Navigation Menu - always rendered, but hidden by CSS on mobile */}
      <nav className="navigation navigation_desktop">
        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogout={onLogout} // Desktop logout doesn't need to close mobile menu
          onSignInClick={onSignInClick} // Desktop sign-in doesn't need to close mobile menu
          isMobile={false} // Indicate this Navigation is for the desktop view
          isSavedNewsPage={isSavedNewsPage} // Pass theme info
        />
      </nav>
    </header>
  );
}

export default Header;
