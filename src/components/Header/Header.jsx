import Navigation from "../Navigation/Navigation";
import "./Header.css";

// Header component must accept the props from App.jsx
function Header({ isLoggedIn, currentUser, onLogout, onSignInClick }) {
  return (
    <header className="header">
      <Navigation
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={onLogout}
        onSignInClick={onSignInClick} // <-- Pass the prop down to Navigation
      />
    </header>
  );
}

export default Header;
