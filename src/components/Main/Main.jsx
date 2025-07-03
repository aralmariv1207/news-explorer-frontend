import React from "react";
import Preloader from "../Preloader/Preloader";
import "./Main.css";


function Main() {
    return (
        <div className="main">
            <h1>Main</h1>
            <Preloader />
            {/* Your main page content goes here */}
        </div>
    );
}
export default Main;