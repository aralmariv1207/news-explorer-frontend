import React from "react";
import { NavLink } from "react-router-dom"; // 'Link' is not used, so it's removed from import
import "./Navigation.css";

function Navigation({ isLoggedIn, currentUser, onLogout, onSignInClick }) {
  return (
    <nav className="navigation">
      <h1 className="navigation__logo">NewsExplorer</h1>
      <div className="navigation__menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "navigation__link navigation__link_active"
              : "navigation__link"
          }
        >
          Home
        </NavLink>

        {isLoggedIn ? ( // Conditional rendering for logged-in state
          <>
            <NavLink
              to="/saved-news" // Assuming this is the path for saved articles
              className={({ isActive }) =>
                isActive
                  ? "navigation__link navigation__link_active"
                  : "navigation__link"
              }
            >
              Saved articles
            </NavLink>
            <button
              className="navigation__button navigation__button_user" // You'll need to define this style in Navigation.css
            >
              {currentUser?.name || "User"}{" "}
              {/* Use currentUser, with a fallback */}
              <span
                className="navigation__logout-icon"
                onClick={onLogout}
              ></span>{" "}
              {/* onLogout is used here */}
            </button>
          </>
        ) : (
          <button className="navigation__signin-button" onClick={onSignInClick}>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
