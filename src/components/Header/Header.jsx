import React from "react";
import "./Header.css";

function Header({ isLoggedIn, currentUser, onLogout, onSignInClick }) {
  return (
    <header className="header header_theme_dark">
      <div className="header__logo">NewsExplorer</div>
      <nav className="navigation">
        <ul className="navigation__menu">
          <li>
            <a href="/" className="navigation__link navigation__link_active">
              Home
            </a>
          </li>
          {isLoggedIn && (
            <li>
              <a href="/saved-news" className="navigation__link">
                Saved articles
              </a>
            </li>
          )}
        </ul>
        {isLoggedIn ? (
          <button className="navigation__button_user" onClick={onLogout}>
            {currentUser?.name || "User"}
            <span className="navigation__logout-icon navigation__logout-icon_theme_white"></span>
          </button>
        ) : (
          <button className="navigation__signin-button" onClick={onSignInClick}>
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
