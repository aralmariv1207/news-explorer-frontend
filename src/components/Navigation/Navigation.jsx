import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navigation">
      <h1>Navigation</h1>
      <Link to="/">Home</Link>
      <Link to="/saved-news">Saved News</Link>
    </div>
  );
}
export default Navigation;
